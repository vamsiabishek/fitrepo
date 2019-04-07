import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const DEVICE_ID = DeviceInfo.getDeviceId();

export const ICON_SIZE_SMALL = 16;
export const ICON_SIZE_MED = 20;
export const ICON_SIZE = 25;
export const ICON_SIZE_NAV = 28;
export const ICON_SIZE_LARGE = 30;
export const ICON_BACK_SIZE = 32;
export const ICON_SIZE_EXTRA_LARGE = 35;
export const ICON_SELECT_GENDER = 80;

export const styleCommon = {
  primaryColor: "#3399ff", // Top Blue Color of Gradient BG
  primaryButtonColor: "#3399ff",
  primaryButtonTextColor: "white",
  secondaryColor: "#d1feff", // Box light Blue color
  secondaryButtonColor: "#d1feff",
  secondaryButtonTextColor: "#004a94", // Dark Blue Color
  textColor1: "#004a94",
  textColor2: "white",
  textColor3: "#d1feff", // Box light Blue color
  disableColor: "#d3d3d3", // Light grey
  selectedButtonColor: "#FA8072", // salmon
  transparentButtonColorRGBA: "rgba(211, 211, 211, 0.3)"
};

export const btnGradientColorLeft = "#66ffff"; // bright blue color
export const btnGradientColorRight = "#FA8072"; // salmon
export const btnGradientColorRightDisabled = "#d3d3d3";
export const modalBtnGradientColorRight = "#004a94"; // bottom blue of background
