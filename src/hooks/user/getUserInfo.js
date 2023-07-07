import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { useSelector } from "react-redux";

const getUserinfo = () => {
  const user = useSelector((state) => state.user.serInfo);

  const [userInfo, setuserInfo] = useState();

  const fetchData = async () => {
    await axios
      .get(`${backendURL}api/applicants/me`)
      .then(({ data }) => setuserInfo(data))
      .catch((error) => setuserInfo(null));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return { userInfo };
};
export default getUserinfo;
