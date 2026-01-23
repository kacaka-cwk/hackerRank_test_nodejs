import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Types
// =======================

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Transaction {
  id: number;
  amount: number;
  type: "credit" | string;
}

// 🧠 Session-level in-memory store
let posts: Post[] = [];

/**
 * Load data from JSONPlaceholder when server starts
 */
async function loadPosts(): Promise<void> {
  try {
    const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    // params getting
    // const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts",{
    //   params: {
    //     search: searchTerm,
    //     page: pageNumber
    //   }
    // });

    
    posts = res.data; // store in memory
    console.log(`Loaded ${posts.length} posts into memory`);
  } catch (err: any) {
    console.error("Failed to load posts:", err.message);
  }
}

loadPosts();


// =======================
// CRUD API
// =======================

// 🔹 GET all posts
app.get("/posts", (req: Request, res: Response) => {
  res.json(posts);
});

// 🔹 GET single post by id
app.get("/posts/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


app.get("/posts-test", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// 🔹 CREATE new post
app.post("/posts", (req: Request, res: Response) => {
  const { userId, title, body, id } = req.body as Partial<Post>;

  const currentIds = posts.map(p => p.id);
  const greatestId = Math.max(...currentIds);
  const isIdUnique = id !== undefined && !currentIds.includes(id);
  const newPostId = isIdUnique && id! > 0 ? id! : greatestId + 1;

  const newPost: Post = {
    userId: Number(userId),
    id: Number(newPostId),
    title: String(title),
    body: String(body),
  };

  posts.push(newPost);
  posts.sort((a, b) => a.id - b.id);

  res.status(201).json(newPost);
});

// 🔹 UPDATE a post
app.put("/posts/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title ?? post.title;
  post.body = req.body.body ?? post.body;

  res.json(post);
});

// 🔹 DELETE a post
app.delete("/posts/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deleted = posts.splice(index, 1);

  res.json({ message: "Deleted successfully", deleted });
});


//------------------test API response for fetchDataTransformation.ts---------------------
app.get("/transaction", (req: Request, res: Response) => {
  try {
    // -----------This method is cancelled as this is a get post, should not include body------------------------
    // const { userId } = req.body as Partial<Post>;
    // console.log(userId)
    // -----------This method is cancelled as this is a get post, should not include body------------------------


    const userId = Number(req.query.userId)
    if(!userId){
      res.status(400).json({ message: "No userId in params"})
    }

    console.log(userId)


    const transactionList:Transaction[] = [
      { id: 1, amount: 90, type: "credit" },
      { id: 1, amount: 190, type: "credit" },
      { id: 1, amount: 2220, type: "credit" },
      { id: 2, amount: 10, type: "credit" },
      { id: 3, amount: 80, type: "credit" },
      { id: 4, amount: 1000, type: "credit" },
      { id: 5, amount: 300, type: "credit" },
    ]
    

    const result = transactionList.filter((t) => t.id == userId);
    
    // ----------If handling filter in here---------------
    // const result = transactionList.filter((t) => {t.id == userId && t.amount > 100});
    // ----------If handling filter in here---------------


    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});









// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
