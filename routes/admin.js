const express = require("express");
const router = express.Router();
const pool = require("../db");

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

function auth(req, res, next) {
  if (req.session.admin) return next();
  res.redirect("/admin/login");
}

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  if (
    req.body.username === ADMIN_USER &&
    req.body.password === ADMIN_PASS
  ) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid credentials");
  }
});

router.get("/dashboard", auth, async (req, res) => {
  const users = await pool.query(
    "SELECT * FROM users ORDER BY created_at DESC"
  );
  res.render("dashboard", { users: users.rows });
});

module.exports = router;
