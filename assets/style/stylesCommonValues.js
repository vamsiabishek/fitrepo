import { Dimensions, Platform, PixelRatio } from "react-native";
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

// based on iphone 6s's scale
const iosBaseScale = SCREEN_WIDTH / 375;
export function normalizeFont(size) {
  let newSize = size 
  if (Platform.OS === 'ios') {
    newSize = size * iosBaseScale 
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const styleCommon = {
  //primaryColor: "#3399ff", // Top Blue Color of Gradient BG
  primaryColor: "#66ffff", // Top Blue Color of Gradient BG
  primaryButtonColor: "#3399ff",
  primaryButtonTextColor: "white",
  secondaryColor: "#d1feff", // Box light Blue color
  secondaryButtonColor: "#d1feff",
  secondaryButtonTextColor: "#004a94", // Dark Blue Color
  textColor1: "#004a94",
  textColor2: "white",
  textColor3: "#d1feff", // Box light Blue color
  unSelected: "grey",
  disableColor: "#d3d3d3", // Light grey
  selectedButtonColor: "#FA8072", // salmon
  transparentButtonColorRGBA: "rgba(211, 211, 211, 0.3)"
};

export const fontsCommon = {
  font10: normalizeFont(10),
  font12: normalizeFont(12),
  font13: normalizeFont(13),
  font14: normalizeFont(14),
  font15: normalizeFont(15),
}

export const btnGradientColorLeft = "#66ffff"; // bright blue color
export const btnGradientColorRight = "#FA8072"; // salmon
export const btnGradientColorRightDisabled = "#d3d3d3";
export const modalBtnGradientColorRight = "#004a94"; // bottom blue of background
export const errorTextcolor = "#F44336";
