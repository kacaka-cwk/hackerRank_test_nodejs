import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Transaction {
  id: number;
  amount: number;
  type: "debit" | "credit";
}

interface RecapResult {
  count: number;
  totalDebitAmount: number;
  maxTransaction: number;
}

async function getUserTransactionRecap(userId: number): Promise<RecapResult> {
  try {
    const res = await axios.get<Transaction[]>(
      `https://api.example.com/transactions?userId=${userId}`
    );

    const transactions = res.data;

    const count = transactions.length;

    const totalDebitAmount = transactions.reduce(
      (sum, t) => (t.type === "debit" ? sum + t.amount : sum),
      0
    );

    const maxTransaction =
      transactions.length > 0
        ? Math.max(...transactions.map(t => t.amount))
        : 0;

    return {
      count,
      totalDebitAmount,
      maxTransaction
    };

  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    throw new Error("Unable to get transaction recap");
  }
}


















app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
