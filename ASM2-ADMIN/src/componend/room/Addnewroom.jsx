import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../UI/Sidebar';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { Navbar } from '../UI/Navbar';
const Addnewroom = () => {
    const admintoken = getCookie("tokenadmin")
    const [statehotellist, setstatehotellist] = useState([])
    const navi = useNavigate()
    const reftitle = useRef()
    const refdes = useRef()
    const refprice = useRef()
    const refpeople = useRef()
    const refroom = useRef()
    const refchoose = useRef()
    const clickhandler = (e) => {
        e.preventDefault();
        const data = {
            title: reftitle.current.value,
            des: refdes.current.value,
            price: refprice.current.value,
            maxpeople: refpeople.current.value,
            room: refroom.current.value,
            hotel: refchoose.current.value,
        }
        // validate
        if (data.title.length == 0 || data.des.length == 0 || data.price.length == 0 || data.maxpeople.length == 0 || data.room.length == 0
        ) {
            alert("Vui long nhap du thong tin")
            return
        }
        const fetchnewroom = async () => {
            const checkadd = await Fetchdata(data, "addnewroom", admintoken)
        }
        fetchnewroom()
        navi("/roomlist")
    }
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchhotellist = async () => {
            const datahotellist = await Fetchdataget("gethotellist", admintoken)
            setstatehotellist(datahotellist)
        }
        fetchhotellist()
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
                            <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <form>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Title</label>
                                            <input ref={reftitle} type="text" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Description</label>
                                            <input ref={refdes} type="text" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Price</label>
                                            <input ref={refprice} type="number" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Max people</label>
                                            <input ref={refpeople} type="number" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4" style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
                                    <div className="col">
                                        <label className="form-label" htmlFor="form6Example7">Room</label>
                                        <textarea ref={refroom} className="form-control" id="form6Example7" rows={2} defaultValue={""} />
                                    </div>
                                    <div className="col">
                                        <div className="form-outline" style={{ display: "flex", flexDirection: "column" }}>
                                            <label className="form-label" htmlFor="form6Example2">Choose a hotel</label>
                                            <select ref={refchoose} style={{ width: "100%" }} name="" id="">
                                                {
                                                    statehotellist.map((item) => <option value={item._id}>{item.name}</option>)
                                                }

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col" style={{ marginBottom: "0", display: "flex", margin: "auto" }} >
                                        <button type='submit' onClick={clickhandler} className="btn btn-primary btn-block ">Send</button>
                                    </div>
                                </div>
                                {/* Submit button */}

                            </form>
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

export default Addnewroom;