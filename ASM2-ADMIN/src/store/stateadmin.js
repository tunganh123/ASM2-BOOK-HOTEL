import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
let initadmin = {
  email: "",
  token: "",
};
const cookiee = getCookie("tokenadmin");
let ckdecode;
if (cookiee) {
  ckdecode = jwt_decode(cookiee);
  initadmin = {
    ...ckdecode,
    token: cookiee,
  };
}
const stateadmin = createSlice({
  name: "admin",
  initialState: initadmin,
  reducers: {
    updateadmin(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state, action) {
      return {
        email: "",
        token: "",
      };
    },
  },
});
export default stateadmin;
