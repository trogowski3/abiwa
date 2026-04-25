const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const INSTANCE_ID = process.env.INSTANCE_ID || uuidv4();

const DATA_FILE = "/data/items.json";

// inicjalizacja pliku
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// helpery
function readItems() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeItems(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

// GET /items
app.get("/items", (req, res) => {
  res.json(readItems());
});

// POST /items
app.post("/items", (req, res) => {
  const items = readItems();

  const item = {
    id: uuidv4(),
    name: req.body.name,
    createdAt: new Date()
  };

  items.push(item);
  writeItems(items);

  res.status(201).json(item);
});

// GET /stats
app.get("/stats", (req, res) => {
  const items = readItems();

  res.json({
    count: items.length,
    instance: INSTANCE_ID
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
