import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    infoUser: null,
    tokenUser: null,
    userLocation:null,
    userLocationForAds:null,
    userLocationForCompanies:null,
    userFavCategory:null,
    favUserJobs:[],
    infoCompany: null,
    tokenCompany: null,
    exp: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.infoUser = action.payload.user;
      state.tokenUser = action.payload.token;
      state.exp = action.payload.exp;
    },
    setOnlyUserInfo:(state,action)=>{
      state.infoUser = action.payload.user;

    },
    setUserLocationForAds:(state,action)=>{
      state.userLocationForAds=action.payload
    },
    cleanUserLocationForAds:(state,action)=>{
      state.userLocationForAds=null
    },
    setUserLocation:(state,action)=>{
      state.userLocation=action.payload
    },    
    cleanUserLocation:(state,action)=>{
      state.userLocation=null
    },

    setUserLocationForCompanies:(state,action)=>{
      state.userLocationForCompanies=action.payload
    },    
    cleanUserLocationForCompanies:(state,action)=>{
      state.userLocationForCompanies=null
    },


  
    setUserFavCategory:(state,action)=>{
      state.userFavCategory=action.payload
    },
    cleanUserFavCategory:(state,action)=>{
      state.userFavCategory=null

    },
    refreshUserOrCompanyToken: (state, action) => {
      state.exp = action.payload.exp;
      state.tokenUser = action.payload.refreshedToken;
    },
    clearUser: (state) => {
      state.infoUser = null;
      state.tokenUser = null;
      state.exp = null;
      state.favUserJobs=[]
    },
    addFavoriteJob: (state, action) => {
      state.favUserJobs.push(action.payload.job.id);
    },
    addAllFavoriteJobs:(state,action)=>{
      state.favUserJobs=[...action.payload]

    },
    deleteFavoriteJob:(state,action)=>{
      const elementToDelete = action.payload;
      const index = state.favUserJobs.indexOf(elementToDelete);

      if (index !== -1) {
        state.favUserJobs.splice(index, 1);
      }
    },
    // setCompany: (state, action) => {
    //   state.infoCompany = action.payload.user;
    //   state.tokenCompany = action.payload.token;
    //   state.exp = action.payload.exp;
    // },
    // clearCompany: (state) => {
    //   state.infoCompany = null;
    //   state.tokenCompany = null;
    //   state.exp = null;
    // },
    clearAll: (state) => {
      state.infoUser = null;
      state.tokenUser = null;
      state.infoCompany = null;
      state.tokenCompany = null;
      state.exp = null;
    },
  },
});

export const {
  setUser,
  setOnlyUserInfo,
  clearUser,
  addFavoriteJob,
  addAllFavoriteJobs,
  deleteFavoriteJob,

  setUserLocationForCompanies,
  cleanUserLocationForCompanies,

  setUserLocationForAds,
  cleanUserLocationForAds,

  setUserLocation,
  cleanUserLocation,
  setUserFavCategory,
  cleanUserFavCategory,

  refreshUserOrCompanyToken,
} = userSlice.actions;
export default userSlice.reducer;
