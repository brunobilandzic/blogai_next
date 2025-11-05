import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import appUserReducer from "./features/appUserSlice";




const store = configureStore({
  reducer: {
    counter: counterReducer,
    appUserInfo: appUserReducer,
  },
});

export default store;