import React, { useRef, useState, useEffect } from 'react';
import "../../css/sb-admin-2.min.css"
import "../../css/sb-admin-2.css"
import Sidebar from '../UI/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
const EditRoom = () => {
    const admintoken = getCookie("tokenadmin")
    const idroom = useParams("idroom")
    const navi = useNavigate()
    const [statedetail, setstatedetail] = useState({
        title: "", roomNumbers: [], price: "", maxPeople: "", desc: ""
    })
    const clickhandler = (e) => {
        e.preventDefault();
        // validate
        if (
            statedetail.title.trim().length == 0 || statedetail.desc.trim().length == 0 || statedetail.price.length == 0 || statedetail.maxPeople.length == 0 || statedetail.roomNumbers[0] == 0) {
            alert("Vui long nhap du thong tin")
            return
        }
        const fetchdetailroom = async () => {
            const result = await Fetchdata(statedetail, `editdetailroom`, admintoken)
            setstatedetail(result)
        }
        fetchdetailroom()
        navi("/roomlist")
    }
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchdetailhotel = async () => {
            const result = await Fetchdataget(`getdetailroom/${idroom.idroom}`, admintoken)
            setstatedetail(result)
        }
        fetchdetailhotel()
    }, [])
    return (
        <>
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div style={{ padding: "2rem" }} id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <div className="container-fluid">
                            <h2 style={{ marginBottom: "2rem" }}>Edit Room</h2>
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <form>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Title</label>
                                            <input type="text" id="form6Example1" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, title: e.target.value }
                                            })} value={statedetail.title} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Description</label>
                                            <input type="text" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, desc: e.target.value }
                                            })} value={statedetail.desc} />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Price</label>
                                            <input type="number" id="form6Example1" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, price: e.target.value }
                                            })} value={statedetail.price} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Max people</label>
                                            <input type="number" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, maxPeople: e.target.value }
                                            })} value={statedetail.maxPeople} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4" style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
                                    <div className="col">
                                        <label className="form-label" htmlFor="form6Example7">Room</label>
                                        <textarea className="form-control" id="form6Example7" rows={2} onChange={(e) => setstatedetail((prev) => {
                                            return { ...prev, roomNumbers: e.target.value.split(",") }
                                        })} value={statedetail.roomNumbers.join(",")} />
                                    </div>
                                    <div className="col" style={{ marginBottom: "0", display: "flex", margin: "auto" }} >
                                        <button type='submit' onClick={clickhandler} className="btn btn-primary btn-block ">Update</button>
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

export default EditRoom;