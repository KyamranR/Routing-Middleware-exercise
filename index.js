const express = require("express");
const app = express();
const itemRoutes = require("./routes");

app.use(express.json());
app.use("/", itemRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Shopping List API");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server running");
  });
}

module.exports = app;
