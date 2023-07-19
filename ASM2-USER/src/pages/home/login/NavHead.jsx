import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../UI/Button'
export const NavHead = () => {
    const navi = useNavigate()
    return (
        <>
            <div className="divNavbar head" style={{ padding: "1rem" }}>
                <h2 onClick={() => navi("/")}>Booking </h2>
                <div>
                    <Button onClick={() => navi("/signup")} sty={{ margin: "auto 1rem" }}>Sign Up</Button>
                    <Button onClick={() => navi("/login")} >Login</Button>
                </div>
            </div>
        </>
    )
}
