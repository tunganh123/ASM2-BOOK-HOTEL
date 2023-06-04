import React from 'react';
import { useRef, useState } from "react";
import { useSelector } from 'react-redux';
const BookingForm = ({ getform }) => {
    const user = useSelector((state) => state.user)
    const [statefullname, setstatefullname] = useState(user.fullname)
    const [stateemail, setstateemail] = useState(user.email)
    const [statephone, setstatephone] = useState(user.phone)
    const [statecard, setstatecard] = useState("")
    const reffullname = useRef()
    const refemail = useRef()
    const refphone = useRef()
    const refcard = useRef()
    const changehandler = () => {
        const value = {
            email: refemail.current.value,
            fullname: reffullname.current.value,
            phone: refphone.current.value,
            cartnumber: refcard.current.value,
        }
        getform(value)
    }

    return (
        <div>
            <h2>Reserver Info</h2>
            <form onChange={changehandler} action="">
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="" style={{ marginBottom: "0.5rem" }}>Your Full Name:</label>
                    <input ref={reffullname} onChange={(e) => setstatefullname(e.target.value)} value={statefullname} type="text" className='form-control' />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="" style={{ marginBottom: "0.5rem" }}>Your Email:</label>
                    <input ref={refemail} onChange={(e) => setstateemail(e.target.value)} value={stateemail} type="text" className='form-control' />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="" style={{ marginBottom: "0.5rem" }}>Your Phone Number:</label>
                    <input ref={refphone} onChange={(e) => setstatephone(e.target.value)} value={statephone} type="number" className='form-control' />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="" style={{ marginBottom: "0.5rem" }}>Your Card Number:</label>
                    <input ref={refcard} onChange={(e) => setstatecard(e.target.value)} value={statecard} type="number" className='form-control' />
                </div>
            </form>
        </div>
    )
}

export default BookingForm;