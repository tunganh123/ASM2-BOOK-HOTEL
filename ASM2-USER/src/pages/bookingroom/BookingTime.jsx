import React from 'react';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState, useRef } from "react";
const BookingTime = ({ gettimefun }) => {
    // State cho DateRange
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const setDateHandler = (item) => {

        gettimefun(item.selection)
        setState([item.selection])
    }
    return (
        <div >
            <h2 style={{ marginBottom: "2rem" }}>Dates</h2>
            <DateRange
                className="date"
                minDate={new Date()}
                editableDateInputs={true}
                onChange={setDateHandler}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </div>
    )
}

export default BookingTime;