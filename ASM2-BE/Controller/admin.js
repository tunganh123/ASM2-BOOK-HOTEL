const User = require("../Models/User");
const Transaction = require("../Models/Transaction");
const Hotel = require("../Models/Hotel");
const Room = require("../Models/Room");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.adminlogin = async (req, res) => {
  try {
    const datauser = req.body;
    const resultadmin = await User.findOne({
      email: datauser.email,
      isAdmin: true,
    });
    if (resultadmin) {
      const bolen = bcrypt.compare(datauser.password, resultadmin.password);
      if (bolen) {
        const token = jwt.sign(
          {
            email: resultadmin.email,
          },
          "privateadmin"
        );
        // res.cookie("tokenadmin", token, {
        //   httpOnly: false,
        //   secure: false,
        //   samesite: "strict",
        // });
        res.status(200).json({ token: token });
      } else res.json({ err: "Thông tin đăng nhập sai" });
    } else res.json({ err: "Thông tin đăng nhập sai" });
  } catch (error) {
    res.json({ err: "Thông tin đăng nhập sai" });
  }
};
exports.adminlogout = async (req, res) => {
  res.clearCookie("tokenadmin");
  res.json({});
};
exports.getinfoboard = async (req, res) => {
  try {
    const datauser = await User.find({ isAdmin: "false" });
    const datatransaction = await Transaction.find();
    const total = datatransaction.reduce((total, item) => {
      return (total = total + item.price);
    }, 0);
    let infoboard = {
      usercount: datauser.length,
      datatransactioncount: datatransaction.length,
      total: total,
      datauser: datauser,
    };
    res.status(200).json(infoboard);
  } catch (error) {
    console.log(error);
  }
};
exports.gettransaction = async (req, res) => {
  const val = await Transaction.find().populate("hotel");
  // Lấy 8 giao dịch gần nhất
  const rq = val.slice(-8);
  res.json(rq);
};
exports.gethotellist = async (req, res) => {
  const val = await Hotel.find();
  res.json(val);
};
exports.getdetailhotel = async (req, res) => {
  try {
    const idhotel = req.params["idhotel"];
    const result = await Hotel.findById(idhotel);
    if (!result) {
      throw new Error("No hotel");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
exports.editdetailhotel = async (req, res) => {
  try {
    const updatehotel = await Hotel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatehotel) {
      throw new Error("err update");
    }
    res.status(200).json({});
  } catch (error) {
    console.log(error);
  }
};
exports.deletehotel = async (req, res) => {
  const id = req.body.id;
  try {
    const hotelitem = await Hotel.findById(id);
    const transactionone = await Transaction.findOne({ hotel: hotelitem._id });
    if (transactionone) {
      res.status(200).json({ err: "Hotel đang có giao dịch" });
    } else {
      const bl = await Hotel.findByIdAndDelete(id);
      if (bl) {
        res.status(200).json({ ok: "Xóa thành công" });
      } else throw new Error("Err DELETE");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.addnewhotel = async (req, res) => {
  try {
    const data = req.body;
    const hotelitem = new Hotel({
      name: data.name,
      type: data.type,
      city: data.city,
      address: data.address,
      distance: data.distance,
      photos: data.img.split(","),
      desc: data.des,
      cheapestPrice: data.price,
      title: data.title,
      rating: 10,
      featured: data.featured,
      rooms: data.rooms.split(","),
    });
    const result = hotelitem.save();
    if (!result) {
      throw new Error("Err save");
    }
    res.json({ a: "b" });
  } catch (error) {
    console.log(error);
  }
};
exports.getroomlist = async (req, res) => {
  const val = await Room.find();
  res.json(val);
};
exports.getdetailroom = async (req, res) => {
  try {
    const idroom = req.params["idroom"];
    const result = await Room.findById(idroom);
    if (!result) {
      throw new Error("No hotel");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
exports.editdetailroom = async (req, res) => {
  console.log(req.body);
  try {
    const updateroom = await Room.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateroom) {
      throw new Error("err update");
    }
    // res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};
exports.deleteroom = async (req, res) => {
  const id = req.body.id;
  try {
    const roomitem = await Room.findById(id);
    const arrhotel = await Hotel.find();
    const transaction = await Transaction.find().populate("hotel");
    const roomarritem = roomitem.roomNumbers;
    // danh sach  khách sạn có phòng vừa click
    const hotelfilter = arrhotel.filter((item) => {
      return item.rooms.includes(String(roomitem._id));
    });
    let check = false;
    // Lặp danh sách các giao dịch
    for (let i = 0; i < transaction.length; i++) {
      // Danh sách room của từng giao dịch
      for (let index = 0; index < transaction[i].room.room.length; index++) {
        // Nếu danh sách room vừa click có chứa trong 1 giao dịch
        if (roomarritem.includes(transaction[i].room.room[index])) {
          // Check trường hợp có số phòng trùng
          // => Phải thỏa mãn danh sách phòng của giao dịch này chứa mã id ( chứa phòng này)
          if (transaction[i].hotel.rooms.includes(id)) {
            check = true;
            res.status(200).json({ err: "Hotel đang có giao dịch" });
            break;
          }
        }
      }
    }
    if (!check) {
      // Xoá phòng
      let bt = await Room.findByIdAndRemove(id);
      if (hotelfilter.length > 0) {
        // Update lại danh sách room của các khách sạn
        for (let index = 0; index < hotelfilter.length; index++) {
          await Hotel.findByIdAndUpdate(hotelfilter[index]._id, {
            $pull: { rooms: id }, //deleting room from hotel
          });
        }
      }
      if (!bt) {
        throw new Error("err delete");
      } else {
        res.status(200).json({ ok: "Xóa thành công" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.addnewroom = async (req, res) => {
  try {
    const data = req.body;
    const roomitem = new Room({
      title: data.title,
      desc: data.des,
      price: data.price,
      maxPeople: data.maxpeople,
      roomNumbers: data.room.split(","),
    });
    const result = await roomitem.save();
    const a = await Hotel.findByIdAndUpdate(data.hotel, {
      $push: { rooms: result._id },
    });
    if (!result) {
      throw new Error("Err save");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.gettransactionall = async (req, res) => {
  const val = await Transaction.find().populate("hotel");
  res.json(val);
};
