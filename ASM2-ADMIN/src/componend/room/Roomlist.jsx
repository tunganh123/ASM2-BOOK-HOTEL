import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../UI/Sidebar';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import { useNavigate } from 'react-router-dom';
import RoomItem from './RoomItem';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { Navbar } from '../UI/Navbar';
import { Btndownload } from '../UI/Btndownload';

const Roomlist = () => {
    const tableref = useRef()
    const admintoken = getCookie("tokenadmin")
    const navi = useNavigate()
    const [stateroomlist, setstateroomlist] = useState([])
    const [statecheckdelete, setstatecheckdelete] = useState("")
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchhotellist = async () => {
            const dataroomlist = await Fetchdataget("getroomlist", admintoken)
            setstateroomlist(dataroomlist)
        }
        fetchhotellist()
    }, [statecheckdelete])
    const clickdelete = (id) => {
        if (window.confirm('Are you sure you wish to delete this Room?')) {
            const fetchdeleteroom = async () => {
                const checkdelete = await Fetchdata({ id: id }, "deleteroom", admintoken)
                if (checkdelete.err) {
                    alert("Room đang có giao dịch")
                } else {
                    setstatecheckdelete(checkdelete)
                }
            }
            fetchdeleteroom()
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
                                <h2 >Rooms List</h2>
                                <button onClick={() => navi("/addnewroom")} style={{ fontWeight: "700", padding: "1rem", height: "auto", color: " #00973f", border: "1px solid  #00973f" }}> Add new</button>
                            </div>
                            <div>
                                <table ref={tableref} className="table table-striped table-bordered" >
                                    <thead style={{ backgroundColor: "rgb(91, 177, 235)", color: "white" }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">MaxPeople</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stateroomlist.map((item, i) => <RoomItem clickdelete={clickdelete} key={i} item={item} i={i} />)
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <Btndownload filename="Rooms List" reftable={tableref.current} />
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

export default Roomlist;