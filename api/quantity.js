const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { database } = require("../config");
const pool = mysql.createPool(database);

// 获取所有订单中产品数量
router.get("/", (req, res) => {
  const sql = "SELECT * FROM `Order_Product`";
  pool.query(sql, (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else res.json(results);
  });
});

// 获取指定产品ID的订单中产品数量
router.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Order_Product WHERE product_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// 获取指定订单ID的订单中产品数量
router.get("/orders/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Order_Product WHERE order_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// 添加订单产品信息
router.post("/", (req, res) => {
  const { orderId, productId, quantity } = req.body;
  const sql =
    "INSERT INTO Order_Product (order_id, product_id, quantity) VALUES (?, ?, ?)";
  pool.query(sql, [orderId, productId, quantity], (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else
      res.status(201).json({
        ok: true,
        errMsg: "",
      });
  });
});

// 更新根据ID订单产品信息
router.put("/", (req, res) => {
  const { orderId, productId, quantity } = req.body;
  const sql =
    "UPDATE `Order_Product` SET quantity = ? WHERE order_id = ? AND product_id = ?;";
  pool.query(sql, [quantity, orderId, productId], (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else res.sendStatus(202);
  });
});

// 删除根据ID订单产品信息
router.delete("/", (req, res) => {
  const { orderId, productId } = req.body;
  const sql =
    "DELETE FROM `Order_Product` WHERE order_id = ? AND product_id = ?;";
  pool.query(sql, [orderId, productId], (err, results) => {
    if (err) {
      console.warn("[Catch]" ,err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else if (results.affectedRows < 1) {
      res.status(400).json({ ok: false, errMsg: "无符合条件的数据" });
    } else res.sendStatus(200);
  });
});

module.exports = router;
