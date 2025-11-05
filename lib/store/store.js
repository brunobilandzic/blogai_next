import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import appUserReducer from "./features/appUserSlice";




const store = configureStore({
  reducer: {
    counter: counterReducer,
    appUser: appUserReducer,
  },
});

export default store;