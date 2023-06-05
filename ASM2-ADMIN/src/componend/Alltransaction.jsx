import React, { useEffect, useState } from 'react';
import Sidebar from './UI/Sidebar';
import { Fetchdataget } from '../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { Navbar } from './UI/Navbar';
const Alltransaction = () => {
    const admintoken = getCookie("tokenadmin")
    const [statealltransaction, setalltransaction] = useState([])
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchalltransaction = async () => {
            const dataroomlist = await Fetchdataget("gettransactionall", admintoken)
            setalltransaction(dataroomlist)
        }
        fetchalltransaction()
    }, [])
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div style={{ padding: "2rem" }} id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        <Navbar />
                        {/* Topbar */}
                        <div className="container-fluid">
                            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2 >All Transaction</h2>

                            </div>
                            <div>
                                <table className="table table-striped table-bordered" >
                                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Hotel</th>
                                            <th scope="col">Room</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Payment Method</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statealltransaction.map((item, i) => {
                                            let startdate = new Date(item.dataStart)
                                            let enddate = new Date(item.dataEnd)
                                            return <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item._id}</td>
                                                <td>{item.user.userName}</td>
                                                <td>{item.hotel.name}</td>
                                                <td>{item.room.room.join(",")}</td>
                                                <td>{`${startdate.toLocaleDateString()} - ${enddate.toLocaleDateString()}`}</td>
                                                <td>{`$ ${item.price}`}</td>
                                                <td>{item.payment}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Your Website 2023</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
        </>
    )
}

export default Alltransaction;