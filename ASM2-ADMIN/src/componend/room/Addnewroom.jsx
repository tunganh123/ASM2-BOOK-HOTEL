import React, { useEffect, useState } from 'react';
import { Fetchdataget } from '../../utils/fetchdata';
import { getCookie } from 'react-use-cookie';
import { ColForm, InputForm, RowForm } from '../../UI/RowForm';
import { Button } from '../../UI/Button';
import { AddRoomMutate } from '../../services/services';
import SpinnerMini from '../../UI/SpinnerMini';
const Addnewroom = () => {
    const admintoken = getCookie("tokenadmin")
    const [statehotellist, setstatehotellist] = useState([])
    const [state, setstate] = useState({
        title: "",
        des: "",
        price: "",
        maxpeople: "",
        room: [],
        hotel: ""
    })
    const { mutate, isLoading } = AddRoomMutate()
    const clickhandler = (e) => {
        e.preventDefault();
        // validate
        if (state.title.length == 0 || state.des.length == 0 || state.price.length == 0 || state.maxpeople.length == 0 || state.room.length == 0
        ) {
            alert("Vui long nhap du thong tin")
            return
        }
        mutate({ token: admintoken, datapost: state })
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
    const changeinput = (e) => {
        setstate((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    return (
        <>
            <h2 style={{ marginBottom: "2rem" }}>Add New Product</h2>
            <form>
                <RowForm>
                    <ColForm tit="Title">
                        <InputForm type="text" name="title" onChange={changeinput} />
                    </ColForm>
                    <ColForm tit="Description">
                        <InputForm type="text" name="des" onChange={changeinput} />
                    </ColForm>
                </RowForm>
                <RowForm>
                    <ColForm tit="Price">
                        <InputForm type="number" name="price" onChange={changeinput} />
                    </ColForm>
                    <ColForm tit="Max people">
                        <InputForm type="text" name="maxpeople" onChange={changeinput} />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm tit="Room">
                        <textarea className="form-control" rows={2} onChange={(e) => setstate((prev) => {
                            return { ...prev, room: e.target.value.split(",") }
                        })} />
                    </ColForm>
                    <ColForm tit="Choose a hotel">
                        <select onChange={(e) => setstate((prev) => {
                            return { ...prev, hotel: e.target.value, }
                        })} style={{ width: "100%" }} >
                            {
                                statehotellist.map((item) => <option value={item._id}>{item.name}</option>)
                            }

                        </select>
                    </ColForm>
                    {
                        isLoading ? <SpinnerMini /> :
                            <ColForm>
                                <Button onClick={clickhandler} className="btn btn-primary btn-block ">Send</Button>
                            </ColForm>
                    }
                </RowForm>
            </form>

        </>
    )
}

export default Addnewroom;