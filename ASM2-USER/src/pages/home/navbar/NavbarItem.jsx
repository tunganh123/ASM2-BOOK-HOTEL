import "./NavbarItem.css"
import { stateholtel } from "../contenthotel/HoltelItem";
import { stateapp } from "../../../App";
import { useContext } from "react";
const NavbarItem = (props) => {

    return (
        //    Kiểm tra data.active nếu true thì thêm class active, nếu k thì rỗng.
        // Thêm fonawesome với className = data.icon
        <p className={`item ${props.data.active ? "active" : ""}`}><i className={`fa ${props.data.icon}`}></i> {props.data.type}</p>
    );
};

export default NavbarItem;