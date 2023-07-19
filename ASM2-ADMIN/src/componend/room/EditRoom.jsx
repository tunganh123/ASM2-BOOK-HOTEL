import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { ColForm, InputForm, RowForm } from '../../UI/RowForm';
import { Button } from '../../UI/Button';
import { EditRoomMutate, GetDetailRoomService } from '../../services/services';
import SpinnerMini from '../../UI/SpinnerMini';
import Spinner from '../../UI/Spinner';
const EditRoom = () => {
    const admintoken = getCookie("tokenadmin")
    const idroom = useParams("idroom")
    const [statedetail, setstatedetail] = useState({
        title: "", roomNumbers: [], price: "", maxPeople: "", desc: ""
    })
    const { isError, isLoading, data } = GetDetailRoomService(admintoken, idroom.idroom)
    const { mutate, isLoading: load } = EditRoomMutate()
    useEffect(() => {
        setstatedetail(data)
    }, [data])

    const clickhandler = (e) => {
        e.preventDefault();
        // validate
        if (
            statedetail.title.trim().length == 0 || statedetail.desc.trim().length == 0 || statedetail.price.length == 0 || statedetail.maxPeople.length == 0 || statedetail.roomNumbers[0] == 0) {
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
            {
                (isLoading || load) && <Spinner />
            }
            {
                isError && !isLoading && <div>Some thing wrong!!!</div>
            }
            {statedetail &&
                <>
                    <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>
                    <form>
                        <RowForm>
                            <ColForm tit="Title">
                                <InputForm value={statedetail.title} type="text" name="title" onChange={changeinput} />
                            </ColForm>
                            <ColForm tit="Description">
                                <InputForm value={statedetail.desc} type="text" name="desc" onChange={changeinput} />
                            </ColForm>
                        </RowForm>
                        <RowForm>
                            <ColForm tit="Price">
                                <InputForm value={statedetail.price} type="number" name="price" onChange={changeinput} />
                            </ColForm>
                            <ColForm tit="Max people">
                                <InputForm value={statedetail.maxPeople} type="text" name="maxPeople" onChange={changeinput} />
                            </ColForm>
                        </RowForm>
                        <RowForm>
                            <ColForm tit="Room">
                                <textarea value={statedetail.roomNumbers} className="form-control" rows={2} onChange={(e) => setstatedetail((prev) => {
                                    return { ...prev, roomNumbers: e.target.value.split(",") }
                                })} />
                            </ColForm>
                            {
                                isLoading ? <SpinnerMini /> :
                                    <ColForm>
                                        <Button onClick={clickhandler} sty={{ marginTop: "1rem" }} className="btn btn-primary btn-block ">Send</Button>
                                    </ColForm>
                            }
                        </RowForm>
                    </form>
                </>
            }

        </>
    )
}

export default EditRoom;
