import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@features/user/userSlice";
import companyReducer from "@features/user/companySlice"
import userAdsReducer from "@features/user/userAdsSlice"

import persistConfig from "./persistConfigUser";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import tokenExpirationMiddlewareUser from "@features/user/tokenExpirationMiddlewareUser";
import persistConfigCompany from "./persisConfigCompany";
import persistConfigUserAds from "./persistConfigUserAds";

const persistedReducer = persistReducer(persistConfig, userReducer);
const persisted2ReducerCompany  =  persistReducer(persistConfigCompany,companyReducer);
const persistedReducerUserAds =  persistReducer(persistConfigUserAds,userAdsReducer);

export const userStore = configureStore({
  reducer:{
    user:persistedReducer,
    company:persisted2ReducerCompany,
    userads:persistedReducerUserAds
    
  },
  devTools: true,
  middleware: [thunk],
});
export const userPersistor = persistStore(userStore);
