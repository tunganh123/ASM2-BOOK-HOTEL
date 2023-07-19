import NavbarItem from "./NavbarItem";
import "./Navbar.css"
import user from "../../../store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { getCookie } from "react-use-cookie"
import { useCookies } from "react-cookie"
import { Button } from "../../../UI/Button";
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
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const action = user.actions;
    const dispatch = useDispatch()
    const userstate = useSelector((state) => state.user)
    const navi = useNavigate()

    const logouthandler = async () => {
        removeCookie("token")
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
                                <Button onClick={() => navi("/transaction")} sty={{ margin: "auto 1rem" }} >Transactions</Button>
                                <Button onClick={logouthandler}>Logout</Button>
                            </div>
                            : <div>
                                <Button onClick={() => navi("/signup")} >Register</Button>
                                <Button onClick={() => navi("/login")} >Login</Button>
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