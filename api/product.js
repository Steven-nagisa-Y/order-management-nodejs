const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { database } = require("../config");
const pool = mysql.createPool(database);

// 获取所有产品信息
router.get("/", (req, res) => {
  const sql = "SELECT * FROM `Product`";
  pool.query(sql, (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.json(results);
  });
});

// 获取指定产品信息
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Product WHERE product_id = ?";
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

// 添加产品信息
router.post("/", (req, res) => {
  const { productName, price } = req.body;
  const sql = "INSERT INTO Product (product_name, price) VALUES (?, ?)";
  pool.query(sql, [productName, price], (err, results) => {
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

// 更新产品信息
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { productName, price } = req.body;
  const sql =
    "UPDATE Product SET product_name = ?, price = ? WHERE product_id = ?";
  pool.query(sql, [productName, price, id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.sendStatus(202);
  });
});

// 删除产品信息
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Product WHERE product_id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.warn(err);
      res.status(400).json({ ok: false, errMsg: err.sqlMessage });
    }
    res.sendStatus(200);
  });
});

module.exports = router;
