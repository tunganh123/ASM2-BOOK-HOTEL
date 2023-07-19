import React, { useState, useEffect } from 'react';
import "../../css/sb-admin-2.min.css"
import "../../css/sb-admin-2.css"
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { ColForm, InputForm, RowForm } from '../../UI/RowForm';
import { Button } from '../../UI/Button';
import { EditHotelMutate, GetDetailHotelService } from '../../services/services';
import Spinner from '../../UI/Spinner';
const EditHotel = () => {
    const admintoken = getCookie("tokenadmin")
    const idhotel = useParams("idhotel")
    const [statedetail, setstatedetail] = useState()
    // react query
    const { mutate, isLoading: load } = EditHotelMutate()
    const { data, isError, isLoading } = GetDetailHotelService(admintoken, idhotel.idhotel)
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
        mutate({ token: admintoken, datapost: statedetail })
    }

    useEffect(() => {
        setstatedetail(data)
    }, [data])
    const changeinput = (e) => {
        setstatedetail((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    return (

        <>
            {
                (isLoading || load) && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {
                statedetail &&
                <>
                    <h2 style={{ marginBottom: "2rem" }}>Edit Product</h2>
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
                        <Button onClick={clickhandler} className="btn btn-primary btn-block mb-4">Update</Button>
                    </form>
                </>
            }

        </>
    )
}

export default EditHotel;