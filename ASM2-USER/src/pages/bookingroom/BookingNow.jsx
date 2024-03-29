import React, { useState, useEffect } from 'react';
import BookingRoom from './BookingRoom';
import BookingTime from './BookingTime';
import BookingForm from './BookingForm';
import { Fetchdata as fetchdata } from '../../utils/fetchdata';
import Navbar from "../home/navbar/Navbar"
import { useSelector } from 'react-redux';
import SeclectRoom from './SelectRoom';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from 'react-router-dom';
import { GetRoomService, QueryRoomMutate, TransactionMutate } from '../../services/services';
import Spinner from '../../UI/Spinner';
import SpinnerMini from '../../UI/SpinnerMini';
const BookingNow = () => {
    const idhotel = useParams().idhotel
    const [detailhotel, setdetail] = useState()
    const usercheck = useSelector((state) => state.user)
    const navi = useNavigate()
    const [staterooms, setstaterooms] = useState([])
    // time range
    const [statetime, setstatetime] = useState({})
    // form
    const [stateform, setstateform] = useState()
    // checkbox
    const [statecheckbox, setstatecheckbox] = useState([])
    // payment
    const [statepayment, setstatepayment] = useState({ type: "", payment: false })

    const { isError, isLoading, data } = GetRoomService({ idhotel: idhotel })
    useEffect(() => {
        if (data) {
            setdetail(data?.hotelitem)
            setstaterooms(data?.room)
        }
    }, [data])


    const { isLoading: load, data: dataroom, mutate } = QueryRoomMutate()
    const { mutate: mutatetransaction } = TransactionMutate()
    const gettimefun = (time) => {
        let dat = {
            ...time,
            detailhotel: detailhotel
        }
        setstatetime(time)
        mutate(dat)
    }
    useEffect(() => {
        if (dataroom) {
            setstaterooms(dataroom)
        }
    }, [dataroom])

    const getform = (val) => {
        setstateform(val)
    }
    // total
    const total = statecheckbox.reduce((total, item) => {
        return total = total + Number(item.room.price * item.checkbox.length)

    }, 0)
    // range date
    const a = new Date(statetime.startDate)
    const b = new Date(statetime.endDate)
    const dayrange = Number(b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000) + 1;
    let totalok;
    if (dayrange) {
        totalok = total * dayrange
    } else totalok = total;
    const datacheckbox = (dat, check) => {
        if (check) {
            let arrcb = [...statecheckbox]
            let indexsame = arrcb.findIndex((item) => item.room._id == dat.room._id)
            if (indexsame >= 0) {
                let it = arrcb[indexsame]
                let newit = {
                    room: it.room,
                    checkbox: [...it.checkbox, ...dat.checkbox]
                }
                // lay phan tu do ra khoi mang
                arrcb.splice(indexsame, 1)
                // cap nhat lai
                arrcb.splice(indexsame, 0, newit)
                setstatecheckbox(arrcb)
            } else {
                setstatecheckbox((prev) => {
                    return [
                        ...prev, dat
                    ]
                })
            }

        } else {
            //Trường hợp checked == false ( bo click sau khi da click)
            let arrcb = [...statecheckbox]
            let indexsame = arrcb.findIndex((item) => item.room._id == dat.room._id)
            if (indexsame >= 0) {
                let it = arrcb[indexsame]
                let indexitroom = it.checkbox.findIndex((item) => item == dat.checkbox[0])
                let newcheckbox = [...it.checkbox]
                newcheckbox.splice(indexitroom, 1)
                if (newcheckbox.length == 0) {
                    arrcb.splice(indexsame, 1)
                    setstatecheckbox(arrcb)
                } else {

                    let newit = {
                        room: it.room,
                        checkbox: newcheckbox
                    }
                    // lay phan tu do ra khoi mang
                    arrcb.splice(indexsame, 1)
                    // cap nhat lai
                    arrcb.splice(indexsame, 0, newit)
                    setstatecheckbox(arrcb)
                }
            }

        }
    }
    const changepayment = (e) => {
        setstatepayment((prev) => {
            return {
                ...prev,
                type: e.target.value
            }
        })
    }
    const reserve = () => {
        let arrcheckbox = [];
        statecheckbox.forEach((item) => {
            arrcheckbox = arrcheckbox.concat(item.checkbox)
        })
        let timerange = {
            dataStart: statetime?.startDate,
            dataEnd: statetime?.endDate,
        }
        // validate login
        if (!usercheck.token) {
            alert("Vui lòng đăng nhập để đặt phòng")
            return
        }
        // validate form
        if (!stateform || stateform?.email.length == 0 || stateform?.fullname.length == 0 || stateform?.phone.length == 0 || stateform?.cartnumber.length == 0) {
            alert("Vui long nhap du thong tin")
            return
        }
        //validate checkbox
        if (arrcheckbox.length == 0) {
            alert("Vui long chọn số phòng muốn đặt")
            return
        }
        // validate payment
        if (!timerange.dataStart || !timerange.dataEnd) {
            alert("Vui long chọn ngày đặt")
            return
        }
        // it give timestamp which is easier to compare
        const start = new Date(timerange.dataStart);
        const end = new Date(timerange.dataEnd);
        const dates = [];
        while (start <= end) {
            dates.push(start.getTime());
            start.setDate(start.getDate() + 1);
        }
        let datacheckbox = {
            room: arrcheckbox,
            time: dates
        }
        let data = {
            user: usercheck,
            detailhotel: detailhotel,
            timerange: timerange,
            checkbox: datacheckbox,
            datauser: stateform,
            payment: statepayment,
            price: totalok
        }
        mutatetransaction(data)
    }
    const successpaymenthandler = (details, data) => {
        alert("Thanh toan thành công")
        setstatepayment((prev) => {
            return {
                ...prev,
                payment: true
            }
        })
    }
    return (
        <>

            <Navbar />
            {
                (isLoading) && <div style={{ display: "flex", justifyContent: "center" }}> <SpinnerMini /></div>
            }
            {
                isError && !isLoading && <div style={{ textAlign: "center" }}>Some thing wrong!!!</div>
            }
            {
                !isError && !isLoading &&
                <>
                    <div className='detail'>
                        {
                            detailhotel &&
                            <BookingRoom detailhotel={detailhotel} />
                        }
                    </div>
                    <div className='detail' style={{ display: "grid", gridTemplateColumns: "0.8fr 2fr", gap: "2rem" }}>
                        <BookingTime gettimefun={gettimefun} />
                        <BookingForm getform={getform} />
                    </div>

                    <div className='detail '>
                        <h2>Select Rooms {load && <SpinnerMini style={{ width: "1.5rem", height: "1.5rem", color: "rgb(91, 177, 235)" }} />}</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                            {
                                staterooms && staterooms.map((room, i) => <SeclectRoom datacheckbox={datacheckbox} gettimem={statetime} key={i} room={room} detailhotel={detailhotel} />)
                            }
                        </div>
                        <div style={{ marginBottom: "2rem" }}>
                            <h2>Total Bill: {totalok} $</h2>
                            <div>
                                <select onChange={changepayment} name="" id="" class="form-select" style={{ width: "20rem", display: "inline-block" }}>
                                    <option value="">Select Payment Method</option>
                                    <option value="Payment with paypal">Payment with paypal</option>
                                    <option value="Payment upon check-in">Payment upon check-in</option>
                                </select>
                                <button onClick={reserve} type="button" class="btn btn-primary" style={{ marginLeft: "2rem" }}> Reserve Now</button>
                                {
                                    statepayment.type == "Payment with paypal" &&
                                    <div style={{ width: "20rem", marginTop: "1rem" }}>
                                        <PayPalButton
                                            amount={totalok}
                                            onSuccess={successpaymenthandler}
                                            onError={() => alert("err")}
                                        />
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default BookingNow;