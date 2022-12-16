require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();
const userRoutes = require("./routes/user");

app.use(express.json());

const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
// app.use("/", (req, res) => res.send("Hello"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
