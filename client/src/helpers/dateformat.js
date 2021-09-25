/* eslint-disable import/no-anonymous-default-export */
import moment from "moment";

const getTime = (createdAt) => moment.utc(createdAt).format("h:mm A");

const getDate = (createdAt) => moment.utc(createdAt).format("MMM DD, YYYY");

const fromNow = (createdAt) => moment.utc(createdAt).fromNow();
const parseDate = (createdAt) => moment.utc(createdAt).format("YYYY-MM-DD");
export default { getDate, getTime, fromNow, parseDate };
