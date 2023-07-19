import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux";
import stateadmin from "../store/stateadmin";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;
const StyledLink = styled(Link)`
  
`
function HeaderMenu() {
  const admin = useSelector(state => state.admin)
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const action = stateadmin.actions;
  const dispatch = useDispatch()
  const clicklogout = () => {
    removeCookie("tokenadmin")
    dispatch(action.logout())
  }
  return (
    <StyledHeaderMenu>
      <li>
        <h2 style={{ color: "#4e73df" }}>{admin.email && `Hello ${admin.email}`}</h2>
      </li>
      <li>
        <ButtonIcon >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        {admin.email &&
          <Link onClick={clicklogout}><h2>Logout</h2></Link>
        }
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
