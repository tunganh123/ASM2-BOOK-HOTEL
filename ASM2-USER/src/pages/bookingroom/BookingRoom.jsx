import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const BookingRoom = ({ detailhotel }) => {

    return (
        <div className="staynow">
            <div className="title">
                <h2>{detailhotel.title}</h2>
                <p>{detailhotel.desc}</p>
            </div>
            <div className="night" style={{ padding: "2rem" }}>
                <p style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "700" }}>${detailhotel.cheapestPrice}</span>(1 nights)</p>
                <button>Reserve or Book Now!</button>
            </div>
        </div>

    )
}

export default BookingRoom;