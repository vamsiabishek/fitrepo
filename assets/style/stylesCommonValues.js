import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const styleCommon = {
  primaryColor: "#3399ff", // Top Blue Color of Gradient BG
  primaryButtonColor: "#3399ff",
  primaryButtonTextColor: "white",
  secondaryColor: "#d1feff", // Box light Blue color
  secondaryButtonColor: "#d1feff",
  secondaryButtonTextColor: "#004a94", // Dark Blue Color
  textColor1: "#004a94",
  textcolor2: "white",
  textColor3: "#d1feff", // Box light Blue color
  disableColor: "#d3d3d3", // Light grey
  selectedButtonColor: "#FA8072", // salmon
  transparentButtonColorRGBA: "rgba(211, 211, 211, 0.3)"
};

export const btnGradientColorLeft = "#66ffff"; // bright blue color
export const btnGradientColorRight = "#FA8072"; // salmon
export const btnGradientColorRightDisabled = "#d3d3d3";
export const modalBtnGradientColorRight = "#004a94"; // bottom blue of background
