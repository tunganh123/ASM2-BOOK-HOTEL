const TransactionModel = require("../Models/Transaction");
const User = require("../Models/User");
const Hotel = require("../Models/Hotel");
exports.transactionpost = async (req, res) => {
  const data = req.body;
  try {
    const hotel = await Hotel.findById(data.detailhotel._id);
    const itemtransaction = new TransactionModel({
      user: {
        userName: data.user.username,
        userId: data.user.id,
      },
      hotel: hotel,
      room: data.checkbox,
      dataStart: data.timerange.dataStart,
      dataEnd: data.timerange.dataEnd,
      price: data.price,
      payment: data.payment.payment
        ? `${data.payment.type} (Đã thanh toán)`
        : `${data.payment.type} (Chưa thanh toán)`,
      status: "Booked",
    });
    await itemtransaction.save();
    res.json({ a: "b" });
  } catch (error) {
    res.json({ err: error.message });
    console.log(error);
  }
};
exports.gettransaction = async (req, res) => {
  try {
    const transactionuser = await TransactionModel.find({
      "user.userId": req.body.id,
    }).populate("hotel");
    res.status(200).json(transactionuser);
  } catch (error) {
    res.json({ err: error.message });
    console.log(error);
  }
};
