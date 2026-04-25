const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const INSTANCE_ID = process.env.INSTANCE_ID || uuidv4();
const PORT = 3000;

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const item = { id: uuidv4(), name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

app.get("/stats", (req, res) => {
  res.json({
    count: items.length,
    instance: INSTANCE_ID
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
