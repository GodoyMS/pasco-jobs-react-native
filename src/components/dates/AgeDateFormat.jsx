import { COLORS, SIZES } from "@constants/theme";
import moment from "moment";
import "moment/locale/es";
import { Text } from "react-native";
const AgeDateFormat = ({ createdAt}) => {
  return (
    <>
      {Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(createdAt).getTime() / 1000) <
        3600 &&
        moment(createdAt).locale("es").startOf("minutes").fromNow()}
      {Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(createdAt).getTime() / 1000) <
        7200 &&
        3600 <=
          Math.floor(new Date().getTime() / 1000) -
            Math.floor(new Date(createdAt).getTime() / 1000) &&
        moment(createdAt).startOf("hour").locale("es").fromNow()}
      {Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(createdAt).getTime() / 1000) <
        86400 &&
        7200 <=
          Math.floor(new Date().getTime() / 1000) -
            Math.floor(new Date(createdAt).getTime() / 1000) &&
        moment(createdAt).startOf("hours").locale("es").fromNow()}
      {Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(createdAt).getTime() / 1000) <
        172800 &&
        86400 <=
          Math.floor(new Date().getTime() / 1000) -
            Math.floor(new Date(createdAt).getTime() / 1000) &&
        moment(createdAt).startOf("day").locale("es").fromNow()}
      {Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(createdAt).getTime() / 1000) >=
        172800 &&
        moment(createdAt).locale("es").startOf("days").fromNow()}
    </>
  );
};

export default AgeDateFormat;
