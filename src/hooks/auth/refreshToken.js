import { backendURL } from "@config/config";
import axios from "axios";

const refreshToken =  ({dispatch,refreshUserOrCompanyToken,tokenExpTime}) => {

    const checkTokenExpiration = async () => {
      const remainingTimeExpToken = tokenExpTime * 1000 - Date.now();
      const fiveSecInMiliseconds = 1000 * 10;
      if (remainingTimeExpToken <= fiveSecInMiliseconds) {
        await axios
          .post(
            `${backendURL}api/applicants/refresh-token`,
            {},
            { withCredentials: "include" }
          )
          .then(({ data }) => dispatch(refreshUserOrCompanyToken(data)))
          .catch((e) => console.log(e));
      }
    };
    checkTokenExpiration(); // Check the token expiration on component mount

    const interval = setInterval(checkTokenExpiration, 1000); // Check token expiration periodically (e.g., every minute)

    return () => clearInterval(interval); //

};

export default refreshToken;