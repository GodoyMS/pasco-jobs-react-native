import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    infoCompany: null,
    tokenCompany: null,
    // userLocation:null,
    // userFavCategory:null,
    // favUserJobs:[],
    // infoCompany: null,
    // tokenCompany: null,
    exp: null,
  },
  reducers: {
    setCompany: (state, action) => {
      state.infoCompany = action.payload.user;
      state.tokenCompany = action.payload.token;
      state.exp = action.payload.exp;
    },
    setOnlyCompanyInfo:(state,action)=>{
      state.infoUser = action.payload.user;

    },
    refreshCompanyInfo: (state, action) => {
      state.exp = action.payload.exp;
      state.tokenUser = action.payload.refreshedToken;
    },
    clearCompany: (state) => {
      state.infoCompany = null;
      state.tokenCompany = null;
      state.exp = null;
    }
    // setUserLocation:(state,action)=>{
    //   state.userLocation=action.payload
    // },
    // cleanUserLocation:(state,action)=>{
    //   state.userLocation=null
    // },
    // setUserFavCategory:(state,action)=>{
    //   state.userFavCategory=action.payload
    // },
    // cleanUserFavCategory:(state,action)=>{
    //   state.userFavCategory=null

    // },

    // addFavoriteJob: (state, action) => {
    //   state.favUserJobs.push(action.payload.job.id);
    // },
    // addAllFavoriteJobs:(state,action)=>{
    //   state.favUserJobs=[...action.payload]

    // },
    // deleteFavoriteJob:(state,action)=>{
    //   const elementToDelete = action.payload;
    //   const index = state.favUserJobs.indexOf(elementToDelete);

    //   if (index !== -1) {
    //     state.favUserJobs.splice(index, 1);
    //   }
    // },
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
    // clearAll: (state) => {
    //   state.infoUser = null;
    //   state.tokenUser = null;
    //   state.infoCompany = null;
    //   state.tokenCompany = null;
    //   state.exp = null;
    // },
  },
});

export const {
  setCompany,
  setOnlyCompanyInfo,
  clearCompany, 
  refreshCompanyInfo,
} = companySlice.actions;
export default companySlice.reducer;
