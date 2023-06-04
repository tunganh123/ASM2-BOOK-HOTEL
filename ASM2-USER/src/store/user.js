import { createSlice } from "@reduxjs/toolkit";
import {} from "react-redux";

const init = {
  id: null,
  username: "",
  token: null,
  email: "",
  fullname: "",
  phone: "",
};
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
      return (state = init);
    },
  },
});
export default user;
