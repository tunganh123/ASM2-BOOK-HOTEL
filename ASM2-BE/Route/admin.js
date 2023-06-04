const express = require("express");
const router = express.Router();
const admin = require("../Controller/admin");
const transaction = require("../Controller/transaction");
const midleware = require("../Middleware/Middleware");
// post transaction
router.post("/adminlogin", admin.adminlogin);
router.get("/adminlogout", admin.adminlogout);

//get infoBoard
router.get("/getinfoboard", midleware.Middlewareadmin, admin.getinfoboard);
//get transaction
router.get("/gettransaction", midleware.Middlewareadmin, admin.gettransaction);
//get transactionall
router.get(
  "/gettransactionall",
  midleware.Middlewareadmin,
  admin.gettransactionall
);
//get hotellist
router.get(
  "/getdetailhotel/:idhotel",
  midleware.Middlewareadmin,
  admin.getdetailhotel
);
//get hotellist
router.get("/gethotellist", midleware.Middlewareadmin, admin.gethotellist);
//edit hotel
router.post(
  "/editdetailhotel",
  midleware.Middlewareadmin,
  admin.editdetailhotel
);
//post deletehotel
router.post("/deletehotel", midleware.Middlewareadmin, admin.deletehotel);
// addnew hotel
router.post("/addnewhotel", midleware.Middlewareadmin, admin.addnewhotel);

//get roomlist
router.get("/getroomlist", midleware.Middlewareadmin, admin.getroomlist);
//get detailroom
router.get(
  "/getdetailroom/:idroom",
  midleware.Middlewareadmin,
  admin.getdetailroom
);
//edit room
router.post("/editdetailroom", midleware.Middlewareadmin, admin.editdetailroom);
//post deleteroom
router.post("/deleteroom", midleware.Middlewareadmin, admin.deleteroom);
// addnew room
router.post("/addnewroom", midleware.Middlewareadmin, admin.addnewroom);
module.exports = router;
