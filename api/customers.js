const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { database } = require("../config");
const pool = mysql.createPool(database);

// 获取所有客户
router.get("/", (req, res) => {
  pool.query("SELECT * FROM Customer", (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else res.send(results);
  });
});

// 获取指定客户信息
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Customer WHERE customer_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// 添加客户信息
router.post("/", (req, res) => {
  const { name, phone } = req.body;
  const sql = "INSERT INTO Customer (name, phone) VALUES (?, ?)";
  pool.query(sql, [name, phone], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else
      res.status(201).json({
        ok: true,
        errMsg: "",
      });
  });
});

// 更新客户信息
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone } = req.body;
  const sql = "UPDATE Customer SET name = ?, phone = ? WHERE customer_id = ?";
  pool.query(sql, [name, phone, id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else res.sendStatus(202);
  });
});

// 删除客户信息
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Customer WHERE customer_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    } else res.sendStatus(200);
  });
});

module.exports = router;
