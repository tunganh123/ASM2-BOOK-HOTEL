const express = require("express");
const router = express.Router();
const mdw = require("../Middleware/Middleware");
const connect = require("../Controller/connect");
router.post("/register", connect.register);
router.post("/login", connect.login);
router.get("/logout", connect.logout);
router.get("/getcity", connect.getcity);
router.get("/gethotel", connect.gethotel);
router.post("/searchhotel", connect.searchhotel);
// getdetail
router.get("/detailhotel/:iddetail", connect.detailhotel);
// get room
router.post("/getroom", connect.getroom);
// queryroom
router.post("/queryroom", connect.queryroom);
module.exports = router;
