import NavbarItem from "./NavbarItem";
import "./Navbar.css"
import user from "../../../store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { getCookie } from "react-use-cookie"
import jwt_decode from "jwt-decode";
let dataNavbar = [
    {
        "type": "Stays",
        "icon": "fa-bed",
        "active": true
    },
    {
        "type": "Flights",
        "icon": "fa-plane",
        "active": false
    },
    {
        "type": "Car rentals",
        "icon": "fa-car",
        "active": false
    },
    {
        "type": "Attractions",
        "icon": "fa-bed",
        "active": false
    },
    {
        "type": "Airport taxis",
        "icon": "fa-taxi",
        "active": false
    }
]
const Navbar = () => {
    const action = user.actions;
    const dispatch = useDispatch()
    const userstate = useSelector((state) => state.user)
    const navi = useNavigate()
    const cookiee = getCookie("token") || ""
    let ckdecode = "";
    if (cookiee) {
        ckdecode = jwt_decode(cookiee)
    }
    // update store khi vao lai web
    if (userstate.email.length == 0) {
        if (ckdecode.email) {
            dispatch(action.updateuser({
                ...ckdecode,
                token: cookiee
            }))
        }
    }
    const logouthandler = async () => {
        let ok = await fetch("http://localhost:5000/logout", {
            method: "GET",
            credentials: "include", // tao cookie phia client
            withCredentials: true, // gui cookie len server
        })
        dispatch(action.logoutuser())
    }
    return (
        <div className="divNavbar">
            <div className="Navbar">
                <div className="head">
                    <h2 onClick={() => navi("/")}>Booking Website</h2>
                    {
                        userstate.email.length > 0 ?
                            <div >
                                <p style={{ marginBottom: "0" }}>{userstate.email}</p>
                                <button onClick={() => navi("/transaction")} style={{ margin: "auto 1rem" }} className="">Transactions</button>
                                <button onClick={logouthandler} className="">Logout</button>
                            </div>
                            : <div>
                                <button onClick={() => navi("/signup")} style={{ margin: "auto 1rem" }} className="">Register</button>
                                <button onClick={() => navi("/login")} className="">Login</button>
                            </div>
                    }
                </div>
                <div className="service">
                    {/* Duyệt danh sách data trả về componend NavbarItem */}
                    {dataNavbar.map((data, i) => <NavbarItem key={i} data={data} />)
                    }

                </div>
            </div>

        </div>
    );
};

export default Navbar;