import React, { useRef } from 'react';
import "../../css/sb-admin-2.min.css"
import "../../css/sb-admin-2.css"
import Sidebar from '../UI/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Fetchdata } from '../../utils/fetchdata';
import { useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
const Addnewhotel = () => {
    const admintoken = getCookie("tokenadmin")
    const navi = useNavigate()
    const refname = useRef()
    const reftype = useRef()
    const refcity = useRef()
    const refaddress = useRef()
    const refdistance = useRef()
    const reftitle = useRef()
    const refdes = useRef()
    const refprice = useRef()
    const refimg = useRef()
    const reffeatured = useRef()
    const refrooms = useRef()

    const clickhandler = (e) => {
        e.preventDefault();
        const data = {
            name: refname.current.value,
            type: reftype.current.value,
            city: refcity.current.value,
            address: refaddress.current.value,
            distance: refdistance.current.value,
            title: reftitle.current.value,
            des: refdes.current.value,
            price: refprice.current.value,
            img: refimg.current.value,
            featured: reffeatured.current.value,
            rooms: refrooms.current.value,
        }
        // validate
        if (data.name.length == 0 || data.type.length == 0 || data.city.length == 0 || data.address.length == 0 || data.distance.length == 0 ||
            data.title.length == 0 || data.des.length == 0 || data.price.length == 0 || data.img.length == 0 || data.rooms.length == 0) {
            alert("Vui long nhap du thong tin")
            return
        }
        const fetchnewhotel = async () => {
            if (!admintoken) {
                return
            }
            const checkadd = await Fetchdata(data, "addnewhotel", admintoken)
        }
        fetchnewhotel()
        navi("/hotellist")
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
                                            <input ref={refname} type="text" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Type</label>
                                            <input ref={reftype} type="text" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">City</label>
                                            <input ref={refcity} type="text" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Address</label>
                                            <input ref={refaddress} type="text" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Distance from City Center</label>
                                            <input ref={refdistance} type="number" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Title</label>
                                            <input ref={reftitle} type="text" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">Description</label>
                                            <input ref={refdes} type="text" id="form6Example1" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Price</label>
                                            <input ref={refprice} type="number" id="form6Example2" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="form-label" htmlFor="form6Example7">Image</label>
                                        <textarea ref={refimg} className="form-control" id="form6Example7" rows={4} defaultValue={""} />
                                    </div>
                                    <div className="col">
                                        <div className="form-outline" style={{ display: "flex", flexDirection: "column" }}>
                                            <label className="form-label" htmlFor="form6Example2">Featured</label>
                                            <select ref={reffeatured} style={{ width: "3.4rem" }} name="" id="">
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* Message input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example7">Rooms</label>
                                    <textarea ref={refrooms} className="form-control" id="form6Example7" rows={4} defaultValue={""} />
                                </div>

                                {/* Submit button */}
                                <button type='submit' onClick={clickhandler} className="btn btn-primary btn-block mb-4">Send</button>
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

export default Addnewhotel;