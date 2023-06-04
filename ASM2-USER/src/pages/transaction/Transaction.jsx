import React, { useState, useEffect } from 'react';
import Navbar from '../home/navbar/Navbar';
import { Fetchdata as fetchdata } from '../../utils/fetchdata';
import { useSelector } from 'react-redux';
const Transaction = () => {
    const user = useSelector((state) => state.user)
    const [statedata, setdata] = useState([])
    const [state, setstate] = useState(true)
    useEffect(() => {
        const fetchnow = async () => {
            try {
                const res = await fetchdata({ id: user.id }, "gettransaction")
                setstate(false)
                setdata(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchnow()
    }, [state])
    console.log(statedata)
    return (
        <>
            <Navbar />
            <div style={{ margin: "0 30px" }}>
                <div style={{ margin: "3rem" }}>
                    <h2 style={{ marginBottom: "2rem" }}>Your Transactions</h2>
                    <table className="table table-striped table-bordered" >
                        <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Hotel</th>
                                <th scope="col">Room</th>
                                <th scope="col">Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                statedata.map((item, i) => {
                                    // convert date
                                    let timestart = new Date(item.dataStart);
                                    let timeend = new Date(item.dataEnd);
                                    let a = timestart.toLocaleDateString()
                                    let b = timeend.toLocaleDateString()
                                    return <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.hotel.name}</td>
                                        <td>{item.room.room.join(",")}</td>
                                        <td>{`${a} - ${b}`}</td>
                                        <td>{item.price}</td>
                                        <td>{item.payment}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                }

                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Transaction;
