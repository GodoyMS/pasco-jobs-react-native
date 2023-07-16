import moment from "moment";
import icons from "@constants/icons";
import "moment/locale/es";

 const convertDateToAgoFormat =(dataJob)=>{

    {Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
    3600 &&
    moment(dataJob.createdAt)
      .locale("es")
      .startOf("minutes")
      .fromNow()}
  {Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
    7200 &&
    3600 <=
      Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
    moment(dataJob.createdAt).startOf("hour").locale("es").fromNow()}
  {Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
    86400 &&
    7200 <=
      Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
    moment(dataJob.createdAt).startOf("hours").locale("es").fromNow()}
  {Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(dataJob.createdAt).getTime() / 1000) <
    172800 &&
    86400 <=
      Math.floor(new Date().getTime() / 1000) -
        Math.floor(new Date(dataJob.createdAt).getTime() / 1000) &&
    moment(dataJob.createdAt).startOf("day").locale("es").fromNow()}
  {Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(dataJob.createdAt).getTime() / 1000) >=
    172800 &&
    moment(dataJob.createdAt).locale("es").startOf("days").fromNow()}



}

export default convertDateToAgoFormat;