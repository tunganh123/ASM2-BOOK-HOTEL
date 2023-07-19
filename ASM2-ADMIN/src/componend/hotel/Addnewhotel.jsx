import React, { useState } from 'react';
import "../../css/sb-admin-2.min.css"
import "../../css/sb-admin-2.css"
import { getCookie } from 'react-use-cookie';
import { ColForm, InputForm, RowForm } from '../../UI/RowForm';
import { Button } from '../../UI/Button';
import { AddHotelMutate } from '../../services/services';
import SpinnerMini from '../../UI/SpinnerMini';
const Addnewhotel = () => {
    const admintoken = getCookie("tokenadmin")
    const [statedetail, setstatedetail] = useState({
        name: "", type: "", city: "", address: "", distance: "", title: "", desc: "", cheapestPrice: "", photos: [], featured: false, rooms: []
    })
    const { mutate, isLoading } = AddHotelMutate()
    const clickhandler = (e) => {
        e.preventDefault();
        // validate
        if (statedetail.name.length == 0 || statedetail.type.length == 0 || statedetail.city.length == 0 || statedetail.address.length == 0 || statedetail.distance.length == 0 ||
            statedetail.title.length == 0 || statedetail.desc.length == 0 || statedetail.cheapestPrice.length == 0 || statedetail.photos.length == 0 || statedetail.rooms.length == 0) {
            alert("Vui long nhap du thong tin")
            return
        }
        mutate({ token: admintoken, datapost: statedetail })
    }
    const changeinput = (e) => {
        setstatedetail((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    return (
        <>
            <h2 style={{ marginBottom: "2rem" }}>Add new Product</h2>
            <form>
                <RowForm>
                    <ColForm tit="Name">
                        <InputForm type="text" name="name" onChange={changeinput} value={statedetail.name} />
                    </ColForm>
                    <ColForm tit="Type">
                        <InputForm type="text" name="type" onChange={changeinput} value={statedetail.type} />
                    </ColForm>
                </RowForm>
                <RowForm>
                    <ColForm tit="City">
                        <InputForm type="text" name="city" onChange={changeinput} value={statedetail.city} />
                    </ColForm>
                    <ColForm tit="Address">
                        <InputForm type="text" name="address" onChange={changeinput} value={statedetail.address} />
                    </ColForm>
                </RowForm>
                <RowForm>
                    <ColForm tit="Distance from City Center">
                        <InputForm type="number" name="distance" onChange={changeinput} value={statedetail.distance} />
                    </ColForm>
                    <ColForm tit="Title">
                        <InputForm type="text" name="title" onChange={changeinput} value={statedetail.title} />
                    </ColForm>
                </RowForm>
                <RowForm>
                    <ColForm tit="Description">
                        <InputForm type="text" name="desc" onChange={changeinput} value={statedetail.desc} />
                    </ColForm>
                    <ColForm tit="Price">
                        <InputForm type="number" name="cheapestPrice" onChange={changeinput} value={statedetail.cheapestPrice} />
                    </ColForm>
                </RowForm>
                <RowForm>
                    <ColForm tit="Image">
                        <textarea className="form-control" rows={4} onChange={(e) => setstatedetail((prev) => {
                            return { ...prev, photos: e.target.value.split(",") }
                        })} value={statedetail.photos.join(",")} />
                    </ColForm>
                    <ColForm tit="Featured">
                        <div>
                            <select style={{ width: "5rem" }} name="" id="" onChange={(e) => setstatedetail((prev) => {
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
                    </ColForm>
                </RowForm>
                <RowForm outline='form-outline mb-4' >
                    <label >Rooms</label>
                    <textarea className="form-control" rows={4} onChange={(e) => setstatedetail((prev) => {
                        return { ...prev, rooms: e.target.value.split(",") }
                    })} value={statedetail.rooms.join(",")} />
                </RowForm>
                {
                    isLoading ? <SpinnerMini /> :
                        <Button onClick={clickhandler} className="btn btn-primary btn-block mb-4">Update</Button>
                }
            </form>


        </>
    )
}
export default Addnewhotel;
