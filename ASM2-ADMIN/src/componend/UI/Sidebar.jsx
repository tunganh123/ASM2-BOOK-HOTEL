import React from 'react';
import { Link } from 'react-router-dom';
import { Fetchdataget } from '../../utils/fetchdata';
const Sidebar = () => {
    // logout
    const clicklogout = () => {
        const logout = async () => {
            const a = await Fetchdataget("adminlogout")
        }
        logout()
    }
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={"/home"} >
                <div className="sidebar-brand-text mx-3">Admin Page </div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <div className="sidebar-heading">
                MAIN
            </div>
            <li className="nav-item active">
                <Link className="nav-link" to={"/home"}>

                    <span>Dashboard</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
                LISTS
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <Link>

                    <span>Users</span>
                </Link>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/hotellist"}>

                    <span>Hotels</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/roomlist"} >

                    <span>Rooms</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/alltransaction"} >

                    <span>Transactions</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
                NEW
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/addnewhotel"}  >
                    <span>New Hotel</span>
                </Link>
            </li>
            {/* Nav Item - Charts */}
            <li className="nav-item">
                <Link className="nav-link" to={"/addnewroom"}>
                    <span>New Room</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
                USER
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <Link className="nav-link" onClick={clicklogout} to={"/"} >
                    <span>Logout</span>
                </Link>
            </li>


        </ul>
    )
}

export default Sidebar;