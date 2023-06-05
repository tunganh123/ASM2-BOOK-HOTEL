import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux";
import stateadmin from '../../store/stateadmin';
export const Navbar = () => {
    const admin = useSelector(state => state.admin)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const action = stateadmin.actions;
    const dispatch = useDispatch()
    const clicklogout = () => {
        removeCookie("tokenadmin")
        dispatch(action.logout())
    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {
                    admin.email &&
                    <div>
                        <label htmlFor="" style={{ marginBottom: "0" }} >{admin.email}</label>
                        <Link onClick={clicklogout} style={{ margin: "1rem", border: "none", textDecoration: "none" }}>Logout</Link>
                    </div>
                }
            </div>
        </>
    )
}
