import React, { useRef, useState, useEffect } from 'react';
import "../../css/sb-admin-2.min.css"
import "../../css/sb-admin-2.css"
import Sidebar from '../UI/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { Fetchdataget, Fetchdata } from '../../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
const EditHotel = () => {
    const admintoken = getCookie("tokenadmin")
    const idhotel = useParams("idhotel")
    const navi = useNavigate()
    const [statedetail, setstatedetail] = useState({
        name: "", type: "", city: "", address: "", distance: "", title: "", desc: "", cheapestPrice: "", photos: [], featured: "", rooms: []
    })
    const clickhandler = (e) => {
        if (!admintoken) {
            return
        }
        e.preventDefault();
        // validate
        if (statedetail.name.trim().length == 0 || statedetail.type.trim().length == 0 || statedetail.city.trim().length == 0 || statedetail.address.trim().trim().length == 0 || statedetail.distance.length == 0 ||
            statedetail.title.trim().length == 0 || statedetail.desc.trim().length == 0 || statedetail.cheapestPrice.length == 0 || statedetail.photos[0] == 0 || statedetail.rooms[0] == 0) {
            alert("Vui long nhap du thong tin")
            return
        }
        const fetchdetailhotel = async () => {
            if (!admintoken) {
                return
            }
            const result = await Fetchdata(statedetail, `editdetailhotel`, admintoken)
            // setdetail(result)
        }
        fetchdetailhotel()
        navi("/hotellist")
    }
    useEffect(() => {
        if (!admintoken) {
            return
        }
        const fetchdetailhotel = async () => {
            const result = await Fetchdataget(`getdetailhotel/${idhotel.idhotel}`, admintoken)
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
                            <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <form>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Name</label>
                                            <input type="text" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, name: e.target.value }
                                            })} id="form6Example1" value={statedetail.name} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Type</label>
                                            <input type="text" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, type: e.target.value }
                                            })} value={statedetail.type} />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">City</label>
                                            <input type="text" id="form6Example1" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, city: e.target.value }
                                            })} value={statedetail.city} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Address</label>
                                            <input type="text" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, address: e.target.value }
                                            })} value={statedetail.address} />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Distance from City Center</label>
                                            <input type="number" id="form6Example1" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, distance: e.target.value }
                                            })} value={statedetail.distance} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Title</label>
                                            <input type="text" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, title: e.target.value }
                                            })} value={statedetail.title} />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Description</label>
                                            <input type="text" id="form6Example1" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, desc: e.target.value }
                                            })} value={statedetail.desc} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Price</label>
                                            <input type="number" id="form6Example2" className="form-control" onChange={(e) => setstatedetail((prev) => {
                                                return { ...prev, cheapestPrice: e.target.value }
                                            })} value={statedetail.cheapestPrice} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="form-label" htmlFor="form6Example7">Image</label>
                                        <textarea className="form-control" id="form6Example7" rows={4} defaultValue={""} onChange={(e) => setstatedetail((prev) => {
                                            return { ...prev, photos: e.target.value.split(",") }
                                        })} value={statedetail.photos.join(",")} />
                                    </div>
                                    <div className="col">
                                        <div className="form-outline" style={{ display: "flex", flexDirection: "column" }}>
                                            <label className="form-label" htmlFor="form6Example2">Featured</label>
                                            <select style={{ width: "3.4rem" }} name="" id="" onChange={(e) => setstatedetail((prev) => {
                                                if (e.target.value == "false") {
                                                    return {
                                                        ...prev, featured: false
                                                    }
                                                }
                                                if (e.target.value == "true") {
                                                    return {
                                                        ...prev, featured: true
                                                    }
                                                }
                                            })} value={String(statedetail.featured)} >
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* Message input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example7">Rooms</label>
                                    <textarea className="form-control" id="form6Example7" rows={4} defaultValue={""} onChange={(e) => setstatedetail((prev) => {
                                        return { ...prev, rooms: e.target.value.split(",") }
                                    })} value={statedetail.rooms.join(",")} />
                                </div>

                                {/* Submit button */}
                                <button type='submit' onClick={clickhandler} className="btn btn-primary btn-block mb-4">Update</button>
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

export default EditHotel;