import React from 'react';
import "./SearchPopup.css"
export default function SearchPopup() {
    return (
        <>
            <div className='divsearchpopup' >
                <h2>Search</h2>
                <div className='destination'>
                    <p>Destination</p>
                    <input type="text" />
                </div>
                <div className='datee'>
                    <p>Check-in Date</p>
                    <input type="text" value="06/24/2022 to 06/24/2022" />
                </div>
                <p className='poption'>Options</p>
                <div className='option'>
                    <span>Min price per night</span>
                    <input className='inputoption' type="text" />
                </div>
                <div className='option'>
                    <span>Max price per night</span>
                    <input className='inputoption' type="text" />
                </div>
                <div className='option'>
                    <span>Adult</span>
                    <input className='inputoption' type="text" value="1" />
                </div>
                <div className='option'>
                    <span>Children</span>
                    <input className='inputoption' type="text" value="0" />
                </div>
                <div className='option'>
                    <span>Room</span>
                    <input className='inputoption' type="text" value="1" />
                </div>
                <button className='btnsearch'>Search</button>
            </div>
        </>
    );
}
