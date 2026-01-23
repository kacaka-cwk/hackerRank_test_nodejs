
const axios = require("axios");


async function getHighSpendingUsers(userIds: number[]) {
  const results = [];

  for (const id of userIds) {
    const user = await fetchUser(id);
    const transactions = await fetchTransactions(id);

    const total = transactions.reduce((sum: number, t: { amount: number; }) => sum + t.amount, 0);

    if (total > 1000) {
      results.push({
        userId: id,
        name: user.name,
        totalSpending: total
      });
    }
  }

  return results;
}

async function fetchUser(id:string | number){
    const res = await axios.get(`https://api.example.com/users/${id}`);
    return res.data;
}


async function fetchTransactions(id: string | number){
    const res = await axios.get(`https://api.example.com/users/${id}/transactions`);
    return res.data;
} 

