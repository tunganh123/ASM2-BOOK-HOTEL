import "./Header.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import { useState, useRef } from "react";
import { Button } from "../../../UI/Button";
import { SearchHotelMutate } from "../../../services/services";
import Spinner from "../../../UI/Spinner";
let countarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Header = () => {
    const reflocation = useRef("")
    const reftime = useRef("")
    const refadult = useRef()
    const refchildren = useRef()
    const refroom = useRef()
    // State check kiểm tra việc đã click vào input date chưa
    const [check, setCheck] = useState(false)
    // State set value cho thẻ input date
    const [vl, setVl] = useState("")
    const [statetime, setstatetime] = useState()
    // State cho DateRange
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    // state popup form count
    const [checkcount, setcheckcount] = useState(false)
    // statevaluecount
    const [valuecount, setvaluecount] = useState()
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
    const { mutate, isLoading } = SearchHotelMutate()
    // Khi click vào btn search chuyển sang trang /search
    function search() {
        const adul = refadult.current ? refadult.current.value : null
        const chil = refchildren.current ? refchildren.current.value : null
        const ro = refroom.current ? refroom.current.value : null
        let datafetch = {
            location: reflocation.current.value,
            time: statetime,
            count: {
                adult: adul ? Number(adul) : "",
                children: chil ? Number(chil) : "",
                room: ro ? Number(ro) : "",
            }
        }
        mutate(datafetch)
    }
    return (
        <>
            <div className="divheader">
                <div className="header">
                    <div className="content">
                        <h1>A lifetime of discounts? It's Genius</h1>
                        <p>Get rewarded for your travels - unlock instant savings of 10% or more with a free account</p>
                        <Button >Signin/Register</Button>
                    </div>
                    <div className="search">
                        {!isLoading &&
                            <div>
                                <input ref={reflocation} type="text" placeholder="&#xf236;   Where are you going?" />
                                <input ref={reftime} type="text" onClick={clickHandle} placeholder="&#xf073;   06/24/2022 to 06/24/2022" value={vl} />
                                <input onClick={() => setcheckcount((prev) => !prev)} type="text" placeholder="&#xf182;   1 adult &#8226; 0 children &#8226; 1 room" value={valuecount} />
                            </div>
                        }
                        {
                            isLoading ? <Spinner /> :
                                <Button sty={{ backgroundColor: "rgb(15, 77, 211)" }} onClick={search}>Search</Button>
                        }

                    </div>
                </div>
                {
                    checkcount &&
                    <div className="checkcount" >
                        <select ref={refadult} name="" id="">
                            <option value="">Adult</option>
                            {
                                countarr.map((count) => <option value={count}>{count}</option>)
                            }
                        </select>
                        <select ref={refchildren} name="" id="">
                            <option value="">Children</option>
                            {
                                countarr.map((count) => <option value={count}>{count}</option>)
                            }
                        </select>
                        <select ref={refroom} name="" id="">
                            <option value="">Room</option>
                            {
                                countarr.map((count) => <option value={count}>{count}</option>)
                            }
                        </select>

                    </div>
                }
                {/* Data range hiện ra khi check == true */}
                <div className="checkdate">
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
        </>
    );
};

export default Header;
