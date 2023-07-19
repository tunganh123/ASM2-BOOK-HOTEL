import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { LoginMutate } from '../../../services/services';
import SpinnerMini from '../../../UI/SpinnerMini';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { NavHead } from './NavHead';
const Login = () => {
    const refemail = useRef()
    const refpassword = useRef()
    const { mutate, isLoading } = LoginMutate()
    const clicklogin = (e) => {
        e.preventDefault()
        const value = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        mutate(value)
    }
    return (
        <>
            <NavHead />
            <form style={{ width: "25rem", textAlign: "center", margin: "5rem auto" }}>
                <h1 style={{ marginBottom: "1rem" }}>Login</h1>
                <Input ref={refemail} placeholder='input email please' type="text" />
                <Input ref={refpassword} placeholder='input password please' type="password" />
                {
                    isLoading ? <SpinnerMini /> :
                        <Button onClick={clicklogin} sty={{ fontWeight: "700", margin: "0", backgroundColor: "rgb(91, 177, 235)", color: "white", width: "100%" }} className='btn'>Login</Button>
                }
            </form>
        </>
    )
}

export default Login;