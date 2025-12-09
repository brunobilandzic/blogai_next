import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import appUserReducer from "./features/appUserSlice";
import loadingReducer from "./features/loadingSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    appUserInfo: appUserReducer,
    loading: loadingReducer,
  },
});

export default store;