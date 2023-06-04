import {} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import statehotel from "./statehotel";
import user from "./user";
const store = configureStore({
  reducer: {
    statehotel: statehotel.reducer,
    user: user.reducer,
  },
});

export default store;
