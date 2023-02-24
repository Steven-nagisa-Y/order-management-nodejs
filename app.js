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

// 日志中间件
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl, req.query, req.body);
  next();
});

app.get("/", (req, res) => {
  res.json({ session: req.session, cookie: req.cookies });
});

app.use("/auth", admin);

// 暂时不开启auth
// 客户
app.use("/customers", customers);
// 订单
app.use("/orders", orders);
// 产品
app.use("/product", product);
// 订单数量
app.use("/quantity", quantity);

// 禁止未定义的请求
app.use((req, res, next) => {
  res.status(405).send("Method Not Allowed");
});

app.use("*", (req, res, next) => {
  res.status(404).send("Page Not Found");
});

// 启动服务器
app.listen(Port, () => {
  console.log("Server started on port 3000");
});
