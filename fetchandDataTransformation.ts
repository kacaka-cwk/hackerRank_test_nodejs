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



import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function analyzeUserPosts(userId: number) {
  const response = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  const posts = response.data;

  const longTitles = posts
    .filter(p => p.title.length > 50)
    .map(p => p.title);

  const avgWordCount =
    posts.reduce((sum, p) => sum + p.body.split(" ").length, 0) /
    posts.length;

  return {
    totalPosts: posts.length,
    longTitles,
    avgWordCount: Math.round(avgWordCount)
  };
}

// Example usage
analyzeUserPosts(1).then(console.log);




