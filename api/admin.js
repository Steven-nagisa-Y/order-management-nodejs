const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { manager } = require("../config");

router.post("/admin", (req, res) => {
  const { name, passwd } = req.body;
  if (manager[name]) {
    bcrypt.compare(passwd, manager[name].passwd, (err, result) => {
      // 如果密码不正确
      if (!result) {
        return res.status(401).json({ errMsg: "密码不正确" });
      } else {
        // 生成 Token，有效期1小时
        const token = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });

        // 返回 Token
        res.json({ token });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
