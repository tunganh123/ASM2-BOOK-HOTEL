import React from 'react';
import "./SearchPopup.css"
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DateRange } from "react-date-range";
import { useSelector } from 'react-redux';
import { Fetchdata as fetchdata } from '../../../utils/fetchdata';
import { useDispatch } from 'react-redux';
import statehotel from '../../../store/statehotel';
export default function SearchPopup() {
    const gettimerange = useSelector((state) => state.statehotel).timerange;
    // State check kiểm tra việc đã click vào input date chưa
    const [check, setCheck] = useState(false)
    // State set value cho thẻ input date
    const [vl, setVl] = useState("")
    const [statetime, setstatetime] = useState()
    const dispatch = useDispatch()
    const action = statehotel.actions;
    // State cho DateRange
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    // Khi click vào input date
    function clickHandle() {
        setCheck(true)
    }
    // Khi đã chọn range date
    function setDateHandle(item) {
        // Item dạng obj có thuộc tính selection , startDate, endDate
        let a = item.selection.startDate;
        let b = item.selection.endDate;
        // Hiển thị kết quả ra thẻ input Date
        setVl(` ${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()} to ${b.getDate()}/${b.getMonth() + 1}/${b.getFullYear()}`)
        setstatetime(item.selection)
        // Set Check = false. Dóng DataRange
        setCheck(false)
    }
    // query param search
    const [searchParams, setSearchParams] = useSearchParams()
    let initstatequeryparam = {
        location: null,
        adult: null,
        children: null,
        room: null,
    }
    const [statequeryparam, setstatequeryparam] = useState(initstatequeryparam)
    useEffect(() => {
        setstatequeryparam((prev) => {
            return {
                location: searchParams.get("location"),
                adult: searchParams.get("adult"),
                children: searchParams.get("children"),
                room: searchParams.get("room")
            }
        })
        // Hiển thị kết quả ra thẻ input Date
        if (searchParams.get("timestart") && searchParams.get("timeend")) {
            let a = new Date(searchParams.get("timestart"))
            let b = new Date(searchParams.get("timeend"))
            setVl(` ${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()} to ${b.getDate()}/${b.getMonth() + 1}/${b.getFullYear()}`)
            setstatetime(gettimerange)
        }
    }, [])
    const searchhandler = () => {
        const adul = statequeryparam.adult
        const chil = statequeryparam.children
        const ro = statequeryparam.room
        let datafetch = {
            location: statequeryparam.location,
            time: statetime,
            count: {
                adult: adul.length > 0 ? Number(adul) : "",
                children: chil.length > 0 ? Number(chil) : "",
                room: ro.length > 0 ? Number(ro) : "",
            }
        }
        const data = async () => {
            try {
                const a = await fetchdata(datafetch, "searchhotel")
                dispatch(action.getarrsearch(a))

            } catch (error) {
                console.log(error)
            }
        }
        data()
    }
    return (
        <>
            <div className='divsearchpopup' >
                <h2>Search</h2>
                <div className='destination'>
                    <p>Destination</p>
                    <input onChange={(e) =>
                        setstatequeryparam((prev) => {
                            return {
                                ...prev,
                                location: e.target.value
                            }
                        })} type="text" value={statequeryparam.location} />
                </div>
                <div className='datee'>
                    <p>Check-in Date</p>
                    <input type="text" onClick={clickHandle} value={vl} />
                    {/* Data range hiện ra khi check == true */}
                    <div >
                        {check ? <DateRange
                            className="date"
                            minDate={new Date()}
                            editableDateInputs={true}
                            onChange={setDateHandle}
                            moveRangeOnFirstSelection={false}
                            ranges={state}


                        /> : ""

                        }
                    </div>
                </div>
                <p className='poption'>Options</p>
                <div className='option'>
                    <span>Min price per night</span>
                    <input className='inputoption' type="text" />
                </div>
                <div className='option'>
                    <span>Max price per night</span>
                    <input className='inputoption' type="text" />
                </div>
                <div className='option'>
                    <span>Adult</span>
                    <input className='inputoption' onChange={(e) =>
                        setstatequeryparam((prev) => {
                            return {
                                ...prev,
                                adult: e.target.value
                            }
                        })} type="text" value={statequeryparam.adult ? statequeryparam.adult : ""} />
                </div>
                <div className='option'>
                    <span>Children</span>
                    <input className='inputoption' onChange={(e) =>
                        setstatequeryparam((prev) => {
                            return {
                                ...prev,
                                children: e.target.value
                            }
                        })} type="text" value={statequeryparam.children ? statequeryparam.children : ""} />
                </div>
                <div className='option'>
                    <span>Room</span>
                    <input className='inputoption' onChange={(e) =>
                        setstatequeryparam((prev) => {
                            return {
                                ...prev,
                                room: e.target.value
                            }
                        })} type="text" value={statequeryparam.room ? statequeryparam.room : ""} />
                </div>
                <button className='btnsearch' onClick={searchhandler}>Search</button>
            </div>

        </>
    );
}
