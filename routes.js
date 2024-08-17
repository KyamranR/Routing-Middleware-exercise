const express = require("express");
const router = new express.Router();
let items = require("./fakeDb");

router.get("/items", (req, res) => {
  return res.json(items);
});

router.post("/items", (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

router.get("/items/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (!foundItem) return res.status(404).json({ error: "Item not found" });
  return res.json(foundItem);
});

router.patch("/items/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (!foundItem) return res.status(404).json({ error: "Item not found" });

  foundItem.name = req.body.name || foundItem.name;
  foundItem.price = req.body.price || foundItem.price;

  res.json({ updated: foundItem });
});

router.delete("/items/:name", (req, res) => {
  const itemIndex = items.findIndex((item) => item.name === req.params.name);
  if (itemIndex === -1)
    return res.status(404).json({ error: "Item not found" });

  items.splice(itemIndex, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
