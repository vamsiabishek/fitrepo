import { Dimensions, Platform, PixelRatio } from "react-native";
import DeviceInfo from "react-native-device-info";

// based on iphone 6s's scale
export function normalizeFont(size) {
  const iosBaseScale = SCREEN_WIDTH / 375;
  let newSize = size;
  if (Platform.OS === "ios") {
    newSize = size * iosBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
export function normalizeHeight(size) {
  const iosBaseScaleH = SCREEN_HEIGHT / 667;
  let newSize = size;
  if (Platform.OS === "ios") {
    newSize = size * iosBaseScaleH;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const commonValues = {
  SCREEN_WIDTH: Dimensions.get("window").width
};

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const DEVICE_ID = DeviceInfo.getDeviceId();
export const DEVICE_NAME = DeviceInfo.getDeviceName();

export const fontsCommon = {
  font10: normalizeFont(10),
  font12: normalizeFont(12),
  font13: normalizeFont(13),
  font14: normalizeFont(14),
  font15: normalizeFont(15),
  font16: normalizeFont(16),
  font17: normalizeFont(17),
  font18: normalizeFont(18),
  font20: normalizeFont(20),
  font22: normalizeFont(22),
  font24: normalizeFont(24),
  font25: normalizeFont(25),
  font28: normalizeFont(28),
  font30: normalizeFont(30),
  font32: normalizeFont(32),
  font35: normalizeFont(35),
  font40: normalizeFont(40),
  font50: normalizeFont(50),
  font70: normalizeFont(70),
  font80: normalizeFont(80),
  letterSpacingOneFive: 1.5
};

export const ICON_SIZE_SMALL = fontsCommon.font16;
export const ICON_SIZE_MED = fontsCommon.font20;
export const ICON_SIZE_22 = fontsCommon.font22;
export const ICON_SIZE_24 = fontsCommon.font24;
export const ICON_SIZE = fontsCommon.font25;
export const ICON_SIZE_NAV = fontsCommon.font28;
export const ICON_SIZE_LARGE = fontsCommon.font30;
export const ICON_BACK_SIZE = fontsCommon.font32;
export const ICON_SIZE_EXTRA_LARGE = fontsCommon.font35;
export const ICON_SELECT_SIGNUP_OPTION = fontsCommon.font50;
export const ICON_SELECT_GENDER = fontsCommon.font80;
export const AVATAR_SIZE = SCREEN_HEIGHT * 0.12;
export const BUTTON_HEIGHT_GENERAL = SCREEN_HEIGHT * 0.06;

export const styleCommon = {
  //primaryColor: "#3399ff", // Top Blue Color of Gradient BG
  primaryColor: "#66ffff", // Top Blue Color of Gradient BG
  primaryButtonColor: "#3399ff",
  primaryButtonTextColor: "white",
  secondaryColor: "#d1feff", // Box light Blue color
  secondaryButtonColor: "#d1feff",
  secondaryButtonTextColor: "#004a94", // bottom Dark Blue Color
  textColor1: "#004a94",
  textColor2: "white",
  textColor3: "#d1feff", // Box light Blue color
  descTextColor: "#808080", // dark gray
  unSelected: "grey",
  disableColor: "#d3d3d3", // Light grey
  darkDisableColor: "#636568",
  selectedButtonColor: "#FA8072", // salmon
  transparentButtonColorRGBA: "rgba(211, 211, 211, 0.3)",
  panelHeaderBoxColor: "#0099CC" // the header color for macros in mydiet page
};

export const btnGradientColorLeft = "#66ffff"; // bright blue color
export const btnGradientColorRight = "#FA8072"; // salmon
export const btnGradientColorRightDisabled = "#d3d3d3";
export const modalBtnGradientColorRight = "#004a94"; // bottom blue of background
export const errorTextcolor = "#F44336";
