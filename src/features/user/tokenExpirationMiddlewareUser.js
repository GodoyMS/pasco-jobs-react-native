import axios from "axios";
import { setUser,clearUser } from "./userSlice";

const refreshToken=async()=>{
    await axios.post(`${backendURL}api/applicants/refresh-token`, {},{withCredentials:"include"})
    .then(({data})=>{return data.token})
    .catch((e)=>console.log(e))
}

const tokenExpirationMiddlewareUser = (store) => (next) => async (action) => {
    if (action.meta?.apiRequest) {
      const state = store.getState();
      const tokenExpiration = state.user.exp;
      const currentTime = new Date().getTime();
  
      // Check if the token has expired
      if (tokenExpiration && currentTime > tokenExpiration) {
        // Token has expired
        // Perform token refresh logic here
        try {
          const refreshedToken = await refreshToken(); // Implement your token refresh logic
  
          // Update the token in the Redux store
          store.dispatch(setUser({ token: refreshedToken }));
  
          // Retry the original API request with the refreshed token
          const newAction = {
            ...action,
            meta: {
              ...action.meta,
              retry: true,
            },
          };
  
          return next(newAction);
        } catch (error) {
          // Token refresh failed
          // Log out the user and perform any necessary cleanup
          store.dispatch(clearUser());
          // You can also show an error message or navigate the user to the login screen
        }
      }
    }
  
    return next(action);
  };
  
  export default tokenExpirationMiddlewareUser;