import React from 'react';
import { useRef } from 'react';
import { LoginMutate } from '../../services/services';
import Spinner from '../../UI/Spinner';
import { Button } from "../../UI/Button"
const Login = () => {
    const refemail = useRef()
    const refpassword = useRef()
    const { mutate, isLoading } = LoginMutate()
    const clicklogin = (e) => {
        e.preventDefault()
        let data = {
            email: refemail.current.value,
            password: refpassword.current.value
        }
        mutate(data)
    }
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem", textAlign: "center" }}>
                <h1 style={{ margin: "auto" }}>Admin </h1>
            </div>
            <form style={{ textAlign: "center", margin: "3rem auto", width: "50rem" }}>
                <input ref={refemail} placeholder='input email please' style={{ marginBottom: "1rem", height: "4rem" }} type="text" className='form-control' />
                <input ref={refpassword} placeholder='input password please' style={{ marginBottom: "1rem", height: "4rem" }} type="password" className='form-control' />
                {
                    isLoading ? <Spinner /> :
                        <Button onClick={clicklogin} sty={{ height: "4rem", backgroundColor: "rgb(91, 177, 235)", color: "white", border: "none", width: "100%" }} >Login</Button>
                }
            </form>
        </>
    )
}

export default Login;