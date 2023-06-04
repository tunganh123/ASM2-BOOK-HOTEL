const User = require("../Models/User");
const Hotel = require("../Models/Hotel");
const Room = require("../Models/Room");
const jwt = require("jsonwebtoken");
const Transaction = require("../Models/Transaction");
const bcryp = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    const value = req.body;
    const passok = await bcryp.hash(value.password, 12);
    const userlist = await User.find();
    const check = userlist.findIndex((item) => item.username == value.username);
    if (check < 0) {
      const user = new User({
        username: value.username,
        password: passok,
        fullName: value.fullname,
        phoneNumber: value.phone,
        email: value.email,
        isAdmin: false,
      });
      user.save();
      res.json();
    } else {
      res.json({ err: "Đã tồn tại user" });
    }
  } catch (error) {
    res.json();
    console.log(error);
  }
};
exports.login = async (req, res) => {
  const value = req.body;
  const resultuser = await User.findOne({ email: value.email });
  try {
    if (resultuser) {
      const bolen = await bcryp.compare(value.password, resultuser.password);
      if (bolen) {
        const token = jwt.sign(
          {
            id: resultuser._id,
            username: resultuser.username,
            email: resultuser.email,
            fullname: resultuser.fullName,
            phone: resultuser.phoneNumber,
          },
          "private"
        );
        // res.cookie("token", token, {
        //   path: "/",
        //   httpOnly: false,
        //   secure: false,
        //   samesite: "strict",
        // });
        res.status(200).json({ token: token });
      } else res.status(404).send();
    } else res.status(404).send();
  } catch (error) {
    console.log(error);
  }
};
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({});
};
exports.getcity = (req, res) => {
  Hotel.find()
    .then((result) => {
      const reshn = result.filter((item) => item.city == "Ha Noi");
      const reshcm = result.filter((item) => item.city == "Ho Chi Minh");
      const resdn = result.filter((item) => item.city == "Da Nang");
      let response = [
        {
          name: "Ha Noi",
          subText: `${reshn.length} properties`,
        },
        {
          name: "Ho Chi minh",
          subText: `${reshcm.length} properties`,
        },
        {
          name: "Da Nang",
          subText: `${resdn.length} properties`,
        },
      ];
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
};
exports.gethotel = (req, res) => {
  Hotel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.searchhotel = async (req, res) => {
  try {
    const data = req.body;
    const roomarr = await Room.find();
    const adult = data.count.adult || 0;
    const children = data.count.children || 0;
    const roomcount = data.count.room;
    let arrhotel = await Hotel.find();
    // search locatiom
    if (data.location) {
      arrhotel = arrhotel.filter((item) => item.city.includes(data.location));
    }
    // search adult children
    if (data.count.adult || data.count.children) {
      const totalpeople = adult + children;
      arrhotel = arrhotel.filter((item) => {
        let total = 0;
        for (let index = 0; index < item.rooms.length; index++) {
          let roomitem = roomarr.find((it) => it._id == item.rooms[index]);
          if (roomitem) {
            total = total + roomitem.maxPeople * roomitem.roomNumbers.length;
          }
        }
        if (total >= totalpeople) {
          return item;
        }
      });
    }
    // seach roomcount
    if (roomcount) {
      arrhotel = arrhotel.filter((item) => {
        let totalroomcount = 0;
        for (let index = 0; index < item.rooms.length; index++) {
          let roomitem = roomarr.find((it) => it._id == item.rooms[index]);
          if (roomitem) {
            totalroomcount = totalroomcount + roomitem.roomNumbers.length;
          }
        }
        if (totalroomcount >= roomcount) {
          return item;
        }
      });
    }
    //search range date
    if (data.time) {
      //Tạo mảng time trong khoảng thời gian search
      const start = new Date(data.time.startDate);
      const end = new Date(data.time.endDate);
      const checkdates = [];
      while (start <= end) {
        checkdates.push(start.getTime());
        start.setDate(start.getDate() + 1);
      }
      ///////////////////////////
      const transaction = await Transaction.find().populate("hotel");
      let arrok = [];
      arrhotel.forEach(async (htel) => {
        // get giao dich voi hotel tuong ung
        const roomtransaction = transaction.filter(
          (it) => String(it.hotel._id) == String(htel._id)
        );
        // danh sach cac loai phong cua hotel tuong ung
        const roomtypehotel = roomarr.filter((ro) => {
          for (let index = 0; index < htel.rooms.length; index++) {
            if (htel.rooms[index] == ro._id) {
              return ro;
            }
          }
        });
        // Lặp mảng loại phòng => trả về các loại phòng với số phòng thay đổi
        const arrtype = roomtypehotel.map((item) => {
          // Lọc danh sách roomNumber của từng loại phòng
          const checkroom1 = item.roomNumbers.filter((it) => {
            // Duyệt qua tất cả các giao dịch của ksan
            for (let i = 0; i < roomtransaction.length; i++) {
              // Trường hợp mảng room của giao dịch có chứa phòng=> check thời gian đặt
              if (roomtransaction[i].room.room.includes(String(it))) {
                // Chỉ trả về phòng với trường hợp khoảng thời gian chọn k chứa thời gian trong giao dịch
                let check = false;
                for (
                  let index = 0;
                  index < roomtransaction[i].room.time.length;
                  index++
                ) {
                  if (
                    checkdates.includes(roomtransaction[i].room.time[index])
                  ) {
                    check = true;
                    break;
                  }
                }
                if (!check) {
                  return it;
                }
              }
            }
          });
          // Lọc danh sách roomNumber của từng loại phòng
          // Trả về các phòng k chứa giao dịch
          const checkroom2 = item.roomNumbers.filter((it) => {
            // Duyệt qua tất cả các giao dịch của ksan
            let check2 = false;
            // Trả về các phòng k chứa giao dịch
            for (let i = 0; i < roomtransaction.length; i++) {
              if (roomtransaction[i].room.room.includes(String(it))) {
                check2 = true;
                break;
              }
            }
            if (!check2) {
              return it;
            }
          });
          item.roomNumbers = checkroom1.concat(checkroom2);
          return item;
        });
        // Loc cac phong dang con phong
        const totalroom = arrtype.reduce(
          (total, rom) => (total = total + rom.roomNumbers.length),
          0
        );
        // console.log(totalroom);
        if (Number(totalroom) > 0) {
          arrok.push(htel);
        }
      });
      arrhotel = arrok;
    }
    res.status(200).json(arrhotel);
  } catch (error) {
    console.log(error);
  }
};
exports.detailhotel = (req, res) => {
  const id = req.params.iddetail;
  Hotel.findById(id)
    .then((resultitem) => {
      res.status(200).json(resultitem);
    })
    .catch((err) => console.log(err));
};
exports.getroom = async (req, res) => {
  try {
    const arrroom = req.body.rooms;
    const room = await Room.find();
    // danh sach cac phong cua hotel tuong ung
    const roomhotel = room.filter((item) => {
      for (let index = 0; index < arrroom.length; index++) {
        if (arrroom[index] == item._id) {
          return item;
        }
      }
    });
    res.status(200).json(roomhotel);
  } catch (error) {
    console.log(error);
  }
};
exports.queryroom = async (req, res) => {
  try {
    const data = req.body;
    const arrroom = req.body.detailhotel.rooms;
    const room = await Room.find();
    const transaction = await Transaction.find();
    // get giao dich voi hotel tuong ung
    const roomtransaction = transaction.filter(
      (it) => it.hotel._id == req.body.detailhotel._id
    );
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const checkdates = [];
    while (start <= end) {
      checkdates.push(start.getTime());
      start.setDate(start.getDate() + 1);
    }
    // danh sach cac loai phong cua hotel tuong ung
    const roomtypehotel = room.filter((item) => {
      for (let index = 0; index < arrroom.length; index++) {
        if (arrroom[index] == item._id) {
          return item;
        }
      }
    });
    // Lặp mảng loại phòng => trả về các loại phòng với số phòng thay đổi
    const arrtype = roomtypehotel.map((item) => {
      // Lọc danh sách roomNumber của từng loại phòng
      const checkroom1 = item.roomNumbers.filter((it) => {
        // Duyệt qua tất cả các giao dịch của ksan
        for (let i = 0; i < roomtransaction.length; i++) {
          // Trường hợp mảng room của giao dịch có chứa phòng=> check thời gian đặt
          if (roomtransaction[i].room.room.includes(String(it))) {
            // Chỉ trả về phòng với trường hợp khoảng thời gian chọn k chứa thời gian trong giao dịch
            let check = false;
            for (
              let index = 0;
              index < roomtransaction[i].room.time.length;
              index++
            ) {
              if (checkdates.includes(roomtransaction[i].room.time[index])) {
                check = true;
                break;
              }
            }
            if (!check) {
              return it;
            }
          }
        }
      });
      // Lọc danh sách roomNumber của từng loại phòng
      // Trả về các phòng k chứa giao dịch
      const checkroom2 = item.roomNumbers.filter((it) => {
        // Duyệt qua tất cả các giao dịch của ksan
        let check2 = false;
        // Trả về các phòng k chứa giao dịch
        for (let i = 0; i < roomtransaction.length; i++) {
          if (roomtransaction[i].room.room.includes(String(it))) {
            check2 = true;
            break;
          }
        }
        if (!check2) {
          return it;
        }
      });
      item.roomNumbers = checkroom1.concat(checkroom2);
      return item;
    });
    // Loc cac phong dang con phong
    let arrfilter = arrtype.filter((item) => item.roomNumbers.length > 0);
    res.status(200).json(arrfilter);
  } catch (error) {
    console.log(error);
  }
};
