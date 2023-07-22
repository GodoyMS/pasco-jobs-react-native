import { createSlice } from "@reduxjs/toolkit";
const userAdsSlice = createSlice({
  name: "userads",
  initialState: {
    infoUserAds: null,
    tokenUserAds: null,
    exp: null,
  },
  reducers: {
    setUserAds: (state, action) => {
      state.infoUserAds = action.payload.user;
      state.tokenUserAds = action.payload.token;
      state.exp = action.payload.exp;
    },
    setOnlyUserAds:(state,action)=>{
      state.infoUserAds = action.payload.user;

    },
    refreshUserAdsInfo: (state, action) => {
      state.exp = action.payload.exp;
      state.tokenUserAds = action.payload.refreshedToken;
    },
    clearUserAds: (state) => {
      state.infoUserAds = null;
      state.tokenUserAds = null;
      state.exp = null;

    },
    setPublishNewAd: (state, action) => {
      return action.payload;
    }
    
   
  },

});

export const {
    setUserAds,
    setOnlyUserAds,
    refreshUserAdsInfo, 
    clearUserAds,
    setPublishNewAd,
 
} = userAdsSlice.actions;
export default userAdsSlice.reducer;
