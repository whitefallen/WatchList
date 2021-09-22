const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");

recordRoutes.route("/watchlist").get(function (req, res) {
  let db_connect = dbo.getDb("watchListDb");
  db_connect
    .collection("watchlist")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/watchlist/add").post(function (req, res) {
  let db_connect = dbo.getDb("watchListDb");
  if(req.body.list) {
    let myList = req.body.list;
    db_connect.dropCollection("watchlist",function (err, _res) {
      db_connect.collection("watchlist").insertMany(myList, function (err, _res) {
        if (err) throw err;
        res.json({"message": "Done"});
      });
    });
  } else {
    res.json({"message": "Failed"})
  }
});


module.exports = recordRoutes;
