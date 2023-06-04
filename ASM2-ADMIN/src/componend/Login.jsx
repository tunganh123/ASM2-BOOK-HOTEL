import React from 'react';
import { useRef } from 'react';
import { Fetchdata } from '../utils/fetchdata';
import stateadmin from '../store/stateadmin';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navi = useNavigate()
    const action = stateadmin.actions;
    const dispatch = useDispatch()
    const refemail = useRef()
    const refpassword = useRef()
    const clicklogin = () => {
        let data = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        const fetchlogin = async () => {
            const result = await Fetchdata(data, "adminlogin")
            const value = jwt_decode(result.token)
            let dataadmin = {
                email: value.email,
                token: result.token
            }
            dispatch(action.updateadmin(dataadmin))
        }
        fetchlogin()
        navi("/home")
    }
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem", textAlign: "center" }}>
                <h2 style={{ margin: "auto" }}>Admin </h2>
            </div>
            <div style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <input ref={refemail} placeholder='input email please' style={{ marginBottom: "1rem" }} type="text" className='form-control' />
                <input ref={refpassword} placeholder='input password please' style={{ marginBottom: "1rem" }} type="password" className='form-control' />
                <button onClick={clicklogin} style={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Login</button>
            </div>
        </>
    )
}

export default Login;