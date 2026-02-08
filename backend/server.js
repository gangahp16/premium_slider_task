
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db");
const Policy = require("./policy");   // ✅ ONLY ONCE

const app = express();
app.use(cors());

app.use(express.json());

// Get all policies
app.get("/policies", async (req, res) => {
  const data = await Policy.find();
  res.json(data);
});

// Filter policies by premium range
app.get("/policies/filter", async (req, res) => {
  const { min, max } = req.query;

  const data = await Policy.find({
    premium: {
      $gte: Number(min),
      $lte: Number(max)
    }
  });

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});