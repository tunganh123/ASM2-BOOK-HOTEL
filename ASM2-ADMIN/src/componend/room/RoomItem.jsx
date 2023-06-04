import React from 'react';
import { useNavigate } from 'react-router-dom';
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
                <th scope="row">{i + 1}</th>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>{item.maxPeople}</td>
                <td><button onClick={clickhandler} style={{ fontWeight: "600", color: " red", border: "1px solid  red" }}>Delete</button></td>
                <td><button onClick={clickedit} style={{ fontWeight: "600", color: " blue", border: "1px solid blue" }}>Edit</button></td>
            </tr>
        </>
    )
}

export default RoomItem;