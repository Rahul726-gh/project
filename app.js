const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

/* ======================
   MIDDLEWARE (VERY IMPORTANT)
   ====================== */

// Parse form data (HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON (future APIs)
app.use(express.json());

/* ======================
   VIEW ENGINE
   ====================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ======================
   SESSION (basic, OK for now)
   ====================== */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

/* ======================
   ROUTES
   ====================== */
const publicRoutes = require("./routes/public");
app.use("/", publicRoutes);

/* ======================
   PORT (RENDER FIX)
   ====================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
