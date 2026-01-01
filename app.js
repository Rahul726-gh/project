const express = require("express");
const path = require("path");

const app = express();

/* =====================
   BODY PARSERS (MUST)
   ===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =====================
   VIEW ENGINE
   ===================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =====================
   ROUTES
   ===================== */
const publicRoutes = require("./routes/public");
app.use("/", publicRoutes);

/* =====================
   HEALTH CHECK (OPTIONAL)
   ===================== */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* =====================
   PORT (RENDER FIX)
   ===================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
