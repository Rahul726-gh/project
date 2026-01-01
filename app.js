require("dotenv").config();
const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");

app.use("/", require("./routes/public"));
app.use("/admin", require("./routes/admin"));

app.listen(3000, () => console.log("Server running"));
