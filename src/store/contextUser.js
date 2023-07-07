import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@features/user/userSlice";
import companyReducer from "@features/user/companySlice"
import persistConfig from "./persistConfigUser";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import tokenExpirationMiddlewareUser from "@features/user/tokenExpirationMiddlewareUser";
import persistConfigCompany from "./persisConfigCompany";

const persistedReducer = persistReducer(persistConfig, userReducer);
const persisted2ReducerCompany  =  persistReducer(persistConfigCompany,companyReducer);
export const userStore = configureStore({
  reducer:{
    user:persistedReducer,
    company:persisted2ReducerCompany
    
  },
  devTools: true,
  middleware: [thunk],
});
export const userPersistor = persistStore(userStore);
