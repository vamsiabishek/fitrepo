import React from "react";
import { View, Text, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  btnGradientColorLeft
} from "../../assets/style/stylesCommonValues";
import { GRADIENT_BG_IMAGE } from "../common/Common";

export default class LoadingAnimation extends React.Component {
  render() {
    return (
      <ImageBackground
        source={GRADIENT_BG_IMAGE}
        style={{
          flex: 1,
          backgroundColor: styleCommon.secondaryButtonColor //btnGradientColorLeft
        }}
      >
        <LottieView
          source={require("../../assets/jsons/watermelon.json")}
          autoPlay
          loop
          style={{
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: styleCommon.secondaryButtonColor,
            width: SCREEN_HEIGHT / 2.1,
            height: SCREEN_HEIGHT / 2.2
            //marginTop: 100
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
            //backgroundColor: "lightcyan"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              color: styleCommon.textColor2
            }}
          >
            We are creating your diet ...
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
