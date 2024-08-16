const express = require("express");
const app = express();
const itemRoutes = require("./routes");

app.use(express.json());
app.use("/items", itemRoutes);

app.listen(3000, () => {
  console.log("Server running");
});

module.exports = app;
