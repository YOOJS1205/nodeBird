const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // db.User

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    // 이메일 중복 체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error); // status 500
  }
});

module.exports = router;
