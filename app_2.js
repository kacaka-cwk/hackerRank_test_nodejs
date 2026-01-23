const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🧠 Session-level in-memory store
let posts = [];

/**
 * Load data from JSONPlaceholder when server starts
 */
async function loadPosts() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts = res.data; // store in memory
    console.log(`Loaded ${posts.length} posts into memory`);
  } catch (err) {
    console.error("Failed to load posts:", err.message);
  }
}

loadPosts();


// =======================
// CRUD API
// =======================

// 🔹 GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// 🔹 GET single post by id
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// 🔹 CREATE new post
app.post("/posts", (req, res) => {
  const { userId, title, body, id } = req.body;

  const currentIds = posts.map(p => p.id);
  const greatestId = Math.max(...currentIds);
  const isIdUnique = !currentIds.some(existingId => existingId === id);
  const newPostId = isIdUnique && id > 0 ? id : greatestId + 1;

  const newPost = {
    userId,
    id: Number(newPostId),
    title,
    body,
  };

  posts.push(newPost);
  posts.sort((a, b) => a.id - b.id);
  
  res.status(201).json(newPost);
});

// 🔹 UPDATE a post
app.put("/posts/:id", (req, res) => {
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
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deleted = posts.splice(index, 1);

  res.json({ message: "Deleted successfully", deleted });
});


// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



