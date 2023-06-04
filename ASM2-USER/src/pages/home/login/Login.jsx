import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"
import user from '../../../store/user';
import { useDispatch } from 'react-redux';
import { setCookie } from "react-use-cookie"
import { url_fetch } from '../../../utils/fetchdata';
const Login = () => {
    const navi = useNavigate()
    const refemail = useRef()
    const refpassword = useRef()
    const dispatch = useDispatch()
    const action = user.actions
    const clicklogin = () => {
        const value = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        const fetchdata = async () => {
            try {
                const a = await fetch(`${url_fetch}/login`, {
                    method: "POST",
                    body: JSON.stringify(value),
                    credentials: "include", // tao cookie phia client
                    withCredentials: true, // gui cookie len server
                    headers: {
                        "content-type": "application/json",
                    },
                });
                if (a.status != 200) {
                    alert("thong tin k dung")
                    return
                }
                const b = await a.json()
                setCookie('token', b.token)
                const c = jwt_decode(b.token)

                dispatch(action.updateuser({
                    ...c,
                    token: b.token
                }))
                navi("/")
            } catch (error) {
                console.error(error);
            }
        };
        fetchdata()
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
                <h1 style={{ marginBottom: "1rem" }}>Login</h1>
                <input ref={refemail} placeholder='input email please' style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input ref={refpassword} placeholder='input password please' style={{ marginBottom: "1rem" }} type="password" className='form-control' />
                <button onClick={clicklogin} style={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Login</button>
            </div>
        </>
    )
}

export default Login;