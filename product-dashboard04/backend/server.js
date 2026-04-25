const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const INSTANCE_ID = process.env.INSTANCE_ID || uuidv4();

let items = [];

// GET /items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST /items
app.post("/items", (req, res) => {
  const item = {
    id: uuidv4(),
    name: req.body.name,
    createdAt: new Date()
  };
  items.push(item);
  res.status(201).json(item);
});

// GET /stats
app.get("/stats", (req, res) => {
  res.json({
    count: items.length,
    instance: INSTANCE_ID
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
