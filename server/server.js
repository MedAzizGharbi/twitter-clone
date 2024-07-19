const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//DATABASE CONNCETION
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//  Define routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const tweetRoutes = require("./routes/tweets");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
