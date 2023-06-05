import { createSlice } from "@reduxjs/toolkit";
import {} from "react-redux";
import { getCookie } from "react-use-cookie";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
let init = {
  id: null,
  username: "",
  token: null,
  email: "",
  fullname: "",
  phone: "",
};
const cookiee = getCookie("token");
let ckdecode;
if (cookiee) {
  ckdecode = jwt_decode(cookiee);
  init = {
    ...ckdecode,
    token: cookiee,
  };
}
const user = createSlice({
  name: "user",
  initialState: init,
  reducers: {
    updateuser(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.phone = action.payload.phone;
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    logoutuser(state, action) {
      return {
        id: null,
        username: "",
        token: null,
        email: "",
        fullname: "",
        phone: "",
      };
    },
  },
});
export default user;
