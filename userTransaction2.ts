import axios from "axios";

interface Account {
  id: number;
  type: "checking" | "savings";
}

interface Transaction {
  id: number;
  amount: number;
  type: "debit" | "credit";
}

async function getUserFinancialSummary(userId: number) {
  try {
    // 1. Fetch accounts for user
    const accRes = await axios.get<Account[]>(
      `https://api.example.com/accounts?userId=${userId}`
    );

    const accounts = accRes.data;

    if (accounts.length === 0) {
      return {
        totalAccounts: 0,
        totalTransactions: 0,
        totalDebitAmount: 0,
        largestCredit: 0,
      };
    }

    // 2. Fetch transactions for all accounts in parallel
    const transactionRequests = accounts.map((account) =>
      axios
        .get<Transaction[]>(
          `https://api.example.com/transactions?accountId=${account.id}`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(`Failed to fetch transactions for account ${account.id}`);
          return []; // allow partial failure
        })
    );

    const transactionsByAccount = await Promise.all(transactionRequests);

    // Flatten all transactions into one list
    const allTransactions = transactionsByAccount.flat();

    // 3. Calculate summary
    let totalDebitAmount = 0;
    let largestCredit = 0;

    for (const t of allTransactions) {
      if (t.type === "debit") {
        totalDebitAmount += t.amount;
      } else if (t.type === "credit") {
        largestCredit = Math.max(largestCredit, t.amount);
      }
    }

    return {
      totalAccounts: accounts.length,
      totalTransactions: allTransactions.length,
      totalDebitAmount,
      largestCredit,
    };
  } catch (err) {
    console.error("Failed to build financial summary:", err);
    throw new Error("Unable to build user financial summary");
  }
}
