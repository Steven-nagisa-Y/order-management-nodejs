const jwt = require("jsonwebtoken");

// 鉴权中间件
function authenticateToken(req, res, next) {
  // 获取 Authorization 请求头中的 token
  const authHeader = req.headers["authorization"];
  const token = authHeader || authHeader.split(" ")[1];
  // 如果没有提供 token，则返回 401 未授权状态码
  if (!token) {
    return res.sendStatus(401);
  }

  // 验证 token 是否有效
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ errMsg: "无效的 Token" });
    }
    console.log(user);
    req.user = user;
    next();
  });
}

// 导出鉴权中间件
module.exports = { authenticateToken };
