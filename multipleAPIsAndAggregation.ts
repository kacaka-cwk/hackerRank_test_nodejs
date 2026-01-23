
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


////// Promise.all version ///////
// import axios from "axios";

// interface Transaction {
//   amount: number;
// }

// interface User {
//   id: number;
//   name: string;
// }

// async function getHighSpendingUsers(userIds: number[]) {
//   // Run all users in parallel
//   const results = await Promise.all(
//     userIds.map(async (id) => {
//       // Fetch user + transactions in parallel for each user
//       const [user, transactions] = await Promise.all([
//         fetchUser(id),
//         fetchTransactions(id),
//       ]);

//       const total = (transactions as Transaction[]).reduce(
//         (sum, t) => sum + t.amount,
//         0
//       );

//       if (total > 1000) {
//         return {
//           userId: id,
//           name: (user as User).name,
//           totalSpending: total,
//         };
//       }

//       // Return null for users that don't qualify
//       return null;
//     })
//   );

//   // Remove nulls (users with spending ≤ 1000)
//   return results.filter(Boolean);
// }

// // =======================
// // API helpers
// // =======================

// async function fetchUser(id: string | number): Promise<User> {
//   const res = await axios.get(`https://api.example.com/users/${id}`);
//   return res.data;
// }

// async function fetchTransactions(id: string | number): Promise<Transaction[]> {
//   const res = await axios.get(`https://api.example.com/users/${id}/transactions`);
//   return res.data;
// }
