import React, { useEffect, useState } from 'react';
import "../css/sb-admin-2.min.css"
import "../css/sb-admin-2.css"
import Sidebar from './UI/Sidebar';
import { useSelector } from 'react-redux';
import stateadmin from '../store/stateadmin';
import { useDispatch } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Fetchdataget } from '../utils/fetchdata';
import { Navbar } from './UI/Navbar';
const Home = () => {
    const [stateinfoboard, setstateinfoboard] = useState()
    const [statetransaction, settransaction] = useState([])
    const admin = useSelector(state => state.admin)

    // logout
    const clicklogout = () => {
        const logout = async () => {
            const a = await Fetchdataget("adminlogout")
        }
        logout()
    }
    useEffect(() => {
        if (!admin.token) {
            return
        }
        const fetchinfoboard = async () => {
            const datainfoboard = await Fetchdataget("getinfoboard", admin.token)
            setstateinfoboard(datainfoboard)
            const datatransaction = await Fetchdataget("gettransaction", admin.token)
            settransaction(datatransaction)
        }
        fetchinfoboard()
    }, [admin.token])
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <Navbar />
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            </div>
                            {/* Content Row */}
                            <div className="row">
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        USERS</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stateinfoboard?.usercount}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        ORDERS</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stateinfoboard?.datatransactioncount}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        EARNINGS</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stateinfoboard?.total}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        BALANCE</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stateinfoboard?.total}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div >
                                    <div >
                                        <h2 style={{ marginBottom: "2rem" }}>Your Transactions</h2>
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
                                                {statetransaction.map((item, i) => {
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

export default Home;