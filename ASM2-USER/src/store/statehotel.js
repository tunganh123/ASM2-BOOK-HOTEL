import {} from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const inithotel = {
  arrsearch: [],
  detail: {},
  timerange: {},
};
const statehotel = createSlice({
  name: "hotel",
  initialState: inithotel,
  reducers: {
    getarrsearch(state, action) {
      state.arrsearch = action.payload;
    },
    getdetail(state, action) {
      state.detail = action.payload;
    },
    settimerange(state, action) {
      state.timerange = action.payload;
    },
  },
});
export default statehotel;
