import React, { useState, useEffect } from 'react';
import Sidebar from '../UI/Sidebar';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import HotelItem from './HotelItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { Navbar } from '../UI/Navbar';
const Hotellist = () => {
    const admintoken = getCookie("tokenadmin")
    const navi = useNavigate()
    const [statehotellist, setstatehotellist] = useState([])
    const [statecheckdelete, setstatecheckdelete] = useState("")
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchhotellist = async () => {
            const datahotellist = await Fetchdataget("gethotellist", admintoken)
            setstatehotellist(datahotellist)
        }
        fetchhotellist()
    }, [statecheckdelete])
    const clickdelete = (id) => {
        if (window.confirm('Are you sure you wish to delete this Hotel?')) {
            const fetchdeletehotel = async () => {
                const checkdelete = await Fetchdata({ id: id }, "deletehotel", admintoken)
                if (checkdelete.err) {
                    alert("Hotel đang có giao dịch")
                } else {
                    setstatecheckdelete(checkdelete)
                }

            }
            fetchdeletehotel()
        }
    }
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
                                <h2 >Hotels List</h2>
                                <button onClick={() => navi("/addnewhotel")} style={{ fontWeight: "700", padding: "1rem", height: "auto", color: " #00973f", border: "1px solid  #00973f" }}> Add new</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered" >
                                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statehotellist.map((item, i) => <HotelItem clickdelete={clickdelete} key={i} item={item} i={i} />)
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

export default Hotellist;