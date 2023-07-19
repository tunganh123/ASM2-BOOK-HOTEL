import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../UI/Button';
const RoomItem = ({ item, i, clickdelete }) => {
    const clickhandler = () => {
        clickdelete(item._id)
    }
    const navi = useNavigate()
    const clickedit = () => {
        navi(`/editroom/${item._id}`)
    }
    return (
        <>
            <tr>
                <td >{i + 1}</td>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>{item.maxPeople}</td>
                <td><Button onClick={clickhandler} sty={{ color: " red", border: "1px solid  red" }}>Delete</Button></td>
                <td><Button onClick={clickedit} sty={{ color: " blue", border: "1px solid blue" }}>Edit</Button></td>
            </tr>
        </>
    )
}

export default RoomItem;