import config from "../pwaConfig";
import { message, notification } from "antd";

message.config({
  top: 70,
  duration: 2,
  maxCount: 3,
  rtl: true,
});

export const getEncodedJWTToken = (payload) => {
  var jwt = require("jsonwebtoken");
  var token = jwt.sign(payload, config.jwtSecretKey);
  return token;
};

export const showSuccessMessage = (msg, duration = 3) => {
  return message.success(msg, duration);
};

export const showNoInternetAlert = () => {
  showWarningMessage("You are offline", 0.5);
};

export const showErrorMessage = (msg, duration = 5) => {
  return message.error(msg, duration);
};

export const showWarningMessage = (msg, duration = 3) => {
  return message.warning(msg, duration);
};
