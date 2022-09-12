const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send({ id: 1, content: "hello" });
});

router.delete("/", (req, res) => {
  res.send({ id: 1 });
});

module.exports = router;
