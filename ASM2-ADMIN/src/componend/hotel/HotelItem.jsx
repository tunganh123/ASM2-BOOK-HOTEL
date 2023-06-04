import React from 'react';
import { useNavigate } from 'react-router-dom';
const HotelItem = ({ item, i, clickdelete, }) => {
    const navi = useNavigate()
    const clickhandler = () => {
        clickdelete(item._id)
    }
    const clickedit = () => {
        navi(`/edithotel/${item._id}`)
    }
    return (
        <>
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.city}</td>
                <td><button onClick={clickhandler} style={{ fontWeight: "600", color: " red", border: "1px solid  red" }}>Delete</button></td>
                <td><button onClick={clickedit} style={{ fontWeight: "600", color: " blue", border: "1px solid blue" }}>Edit</button></td>
            </tr>
        </>
    )
}

export default HotelItem;