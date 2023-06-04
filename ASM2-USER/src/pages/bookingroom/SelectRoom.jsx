import React from 'react';
import Checkboxroom from './Checkboxroom';

const SeclectRoom = ({ room, gettimem, detailhotel, datacheckbox }) => {
    // console.log(room)
    let a = "";
    if (gettimem.startDate) {
        a = ` ${gettimem.startDate.toLocaleString('default', { month: 'long' })} ${gettimem.startDate.getDate()} ${gettimem.startDate.getFullYear()}`
    }
    const datacheck = (data, check) => {
        let dat = {
            checkbox: [data],
            room: room
        }
        datacheckbox(dat, check)
    }
    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: " 1fr 1fr", gap: "2rem" }}>
                <div>
                    <h6 style={{ fontWeight: "600" }}>{room.title}</h6>
                    <p>Pay nothing until {a}</p>
                    <div>
                        <span>Max people: </span>
                        <span>{room.maxPeople}</span>
                    </div>
                    <p>$ {room.price}</p>
                </div>
                <div style={{ display: "flex", marginTop: "2rem" }}>
                    {room.roomNumbers.map((ro, i) => <Checkboxroom datacheck={datacheck} key={i} ro={ro} room={room} />)}

                </div>
            </div>
        </>
    )
}

export default SeclectRoom;