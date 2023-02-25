const Port = 8787;
require("dotenv").config();

// 引入所需的模块
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./api/admin");
const customers = require("./api/customers");
const orders = require("./api/orders");
const product = require("./api/product");
const quantity = require("./api/quantity");
const { authenticateToken } = require("./api/jwt");

// 创建Express应用程序
const app = express();

// 解析POST请求的请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//设置跨域访问
const cors = require('cors');
app.use(cors());

// 日志中间件
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl, req.query, req.body);
  next();
});

app.get("/", authenticateToken, (req, res) => {
  res.json({ ok: true});
});

app.use("/auth", admin);

// 客户
app.use("/customers", authenticateToken, customers);
// 订单
app.use("/orders", authenticateToken, orders);
// 产品
app.use("/product", authenticateToken, product);
// 订单数量
app.use("/quantity", authenticateToken, quantity);

// 屏蔽未设置的url
app.use("*", (req, res, next) => {
  res.status(404).send("Page Not Found");
});

// 启动服务器
app.listen(Port, () => {
  console.log("Server started on port " + Port);
});
