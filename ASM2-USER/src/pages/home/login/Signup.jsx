import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { Fetchdata as fetchdata } from '../../../utils/fetchdata';
const Signup = () => {
    const navi = useNavigate()
    const refemail = useRef()
    const refpassword = useRef()
    const refusername = useRef()
    const reffullname = useRef()
    const refphone = useRef()
    const clickSignup = async () => {
        const value = {
            email: refemail.current.value,
            password: refpassword.current.value,
            username: refusername.current.value,
            fullname: reffullname.current.value,
            phone: refphone.current.value,

        }
        const check = await fetchdata(value, "register")
        if (check.err) {
            alert(check.err)
        } else navi("/login")
    }
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem" }}>
                <h2 onClick={() => navi("/")}>Booking </h2>
                <div>
                    <button onClick={() => navi("/signup")} style={{ margin: "auto 1rem" }}>Sign Up</button>
                    <button onClick={() => navi("/login")} className="">Login</button>
                </div>
            </div>
            <div style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <h1 style={{ marginBottom: "1rem" }}>Sign up</h1>
                <input placeholder='input Username please' ref={refusername} style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input placeholder='input fullname please' ref={reffullname} style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input placeholder='input phoneNumber please' ref={refphone} style={{ marginBottom: "1rem" }} type="number" className='form-control' />
                <input style={{ marginBottom: "1rem" }} ref={refemail} placeholder='input email please' type="text" className='form-control' />
                <input style={{ marginBottom: "1rem" }} ref={refpassword} placeholder='input password please' type="password" className='form-control' />
                <button onClick={clickSignup} style={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Create Account</button>
            </div>
        </>
    )
}

export default Signup;