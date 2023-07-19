import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../UI/Button';
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
                <td scope="row">{i + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.city}</td>
                <td><Button onClick={clickhandler} sty={{ color: " red", border: "1px solid  red" }}>Delete</Button></td>
                <td><Button onClick={clickedit} sty={{ color: " blue", border: "1px solid blue" }}>Edit</Button></td>
            </tr>
        </>
    )
}

export default HotelItem;