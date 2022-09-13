const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models"); // db.User
const db = require("../models");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // server error
      console.error(err);
      return next(err);
    }
    if (info) {
      // client error
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Post,
          },
          {
            model: db.User,
            as: "Followings",
          },
          {
            model: db.User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/user/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

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
