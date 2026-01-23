/**
 Load data from JSONPlaceholder when server starts


 Problem
Given a userId, fetch that user’s transactions from:
GET https://api.example.com/transactions?userId=123

Each transaction has:
{ "id": 1, "amount": 120, "type": "credit" }

Return:

total transaction count
total amount
only transactions above $100

 */
import express, { Request, Response } from "express";
import axios from "axios";


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




type Transaction = {
  id: number;
  amount: number;
  type: string;
};

async function analyzeTransactions(userId: number) {
  try {
    // const res = await axios.get<Transaction[]>(
    //   `https://api.example.com/transactions?userId=${userId}`
    // );
    
    const res = await axios.get<Transaction[]>(
      `http://localhost:3000/transaction?userId=${userId}`
    );

    const transactions = res.data;

    const highValue = transactions.filter(t => t.amount > 100);

    const totalAmount = transactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    return {
      count: transactions.length,
      totalAmount,
      highValueTransactions: highValue
    };
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch transactions");
  }
}


app.get("/test", async (req: Request, res: Response) => {
  try {
    const postAnswer = await analyzeTransactions(1);

    res.status(200).json(postAnswer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
