const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/submit", async (req, res) => {
  const { name, dob, phone, email, address } = req.body;

  await pool.query(
    `INSERT INTO users (name, dob, phone, email, address)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, dob, phone, email, address]
  );

  res.send("Form submitted successfully");
});

router.get("/submit", (req, res) => {
  res.redirect("/");
});

module.exports = router;
