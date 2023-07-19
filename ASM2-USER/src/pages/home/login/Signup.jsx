import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Fetchdata as fetchdata } from '../../../utils/fetchdata';
import { NavHead } from './NavHead';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { SignupMutate } from '../../../services/services';
import SpinnerMini from '../../../UI/SpinnerMini';
const Signup = () => {
    const [state, setstate] = useState({
        email: "",
        password: "",
        username: "",
        fullname: "",
        phone: "",
    })
    const { mutate, isLoading } = SignupMutate()
    const clickSignup = (e) => {
        e.preventDefault()
        // validate
        if (state.email.trim().length == 0) {
            alert("vui long nhap email")
            return
        }
        if (state.password.trim().length == 0) {
            alert("vui long nhap password")
            return
        }
        if (state.username.trim().length == 0) {
            alert("vui long nhap username")
            return
        }
        if (state.fullname.trim().length == 0) {
            alert("vui long nhap fullname")
            return
        }
        if (state.phone.trim().length == 0) {
            alert("vui long nhap phone")
            return
        }
        mutate(state)
    }
    const changeinput = (e) => {
        setstate((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    return (
        <>
            <NavHead />
            <form style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <h1 style={{ marginBottom: "1rem" }}>Sign up</h1>
                <Input placeholder='input Username please' name="username" onChange={changeinput} type="text" />
                <Input placeholder='input fullname please' name="fullname" onChange={changeinput} type="text" />
                <Input placeholder='input phoneNumber please' name="phone" onChange={changeinput} type="number" />
                <Input placeholder='input email please' name="email" onChange={changeinput} type="text" />
                <Input placeholder='input password please' name="password" onChange={changeinput} type="password" />
                {
                    isLoading ? <SpinnerMini /> :
                        <Button onClick={clickSignup} sty={{ width: "100%" }} >Create Account</Button>
                }
            </form>
        </>
    )
}

export default Signup;