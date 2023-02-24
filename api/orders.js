const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { database } = require("../config");
const pool = mysql.createPool(database);

// 获取所有订单信息
router.get("/", (req, res) => {
  const sql = "SELECT * FROM `Order`";
  pool.query(sql, (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.json(results);
  });
});

// 获取指定订单信息
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `Order` WHERE order_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// 添加订单信息
router.post("/", (req, res) => {
  const { orderDate, customerId } = req.body;
  const sql = "INSERT INTO `Order` (order_date, customer_id) VALUES (?, ?)";
  pool.query(sql, [orderDate, customerId], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.status(201).json({
      ok: true,
      errMsg: "",
    });
  });
});

// 更新订单信息
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { orderDate, customerId } = req.body;
  const sql =
    "UPDATE `Order` SET order_date = ?, customer_id = ? WHERE order_id = ?";
  pool.query(sql, [orderDate, customerId, id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.status(202).json({
      ok: true,
      errMsg: "",
    });
  });
});

// 删除订单信息
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `Order` WHERE order_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.status(200).json({
      ok: true,
      errMsg: "",
    });
  });
});

module.exports = router;
