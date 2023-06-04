const express = require("express");
const router = express.Router();
const midderware = require("../Middleware/Middleware");
const transaction = require("../Controller/transaction");
// post transaction
router.post("/transaction", transaction.transactionpost);
//get transaction
router.post("/gettransaction", transaction.gettransaction);
module.exports = router;
