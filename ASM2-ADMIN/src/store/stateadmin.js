import { createSlice } from "@reduxjs/toolkit";

const initadmin = {
  email: "",
  token: "",
};
const stateadmin = createSlice({
  name: "admin",
  initialState: initadmin,
  reducers: {
    updateadmin(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
});
export default stateadmin;
