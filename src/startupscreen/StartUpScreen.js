import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  ScrollView,
  UIManager
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button, Overlay } from "react-native-elements";
import { styles } from "../../assets/style/stylesStartUpScreen";
import {
  source1,
  source2,
  source3,
  source4,
  source5,
  source6,
  source7,
  source8,
  source9
} from "../common/Common";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class StartUpScreen extends Component {
  intervalId = 0;
  componentDidMount = () => {
    const numberOfImages = 9;
    let scrollValue = 0,
      scrolled = 0;
    this.intervalId = setInterval(() => {
      scrolled++;
      if (scrolled !== numberOfImages) {
        scrollValue = scrollValue + SCREEN_WIDTH;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }
      _scrollView.scrollTo({ x: scrollValue, animated: true });
    }, 3000);
  };
  componentWillUnmount = () => {
    console.log("In componentunmount");
    clearInterval(this.intervalId);
  };
  render() {
    const gradientColorLeft = "#66ffff";
    const gradientColorRight = "#FA8072";
    const { navigate } = this.props.navigation;
    return (
      <View>
        <StatusBar hidden={true} />
        <ScrollView
          ref={scrollView => {
            _scrollView = scrollView;
          }}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          decelerationRate={0.1}
          bounces={false}
        >
          <ImageBackground
            source={source1}
            style={{
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH
            }}
          />
          <ImageBackground
            source={source2}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source3}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source4}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source5}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source6}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source7}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source8}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
          <ImageBackground
            source={source9}
            style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
          />
        </ScrollView>
        <Overlay
          fullScreen={true}
          isVisible={true}
          windowBackgroundColor="rgb(0, 0, 0, .5)"
          overlayStyle={styles.overlayContainerstyle}
          overlayBackgroundColor="transparent"
        >
          <View style={styles.overlaySubContainerstyle}>
            <View style={styles.headerViewContainer}>
              <Text style={styles.textStyle}>WELCOME TO</Text>
              <Text style={styles.logoText}>FITREPO</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="SIGN UP"
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [gradientColorLeft, gradientColorRight],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 }
                }}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.signUpButtonStyle}
                titleStyle={styles.signUpButtonTitleStyle}
                onPress={() => navigate("SignUp")}
              />
              <Button
                title="LOG IN"
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.loginButtonStyle}
                titleStyle={styles.loginButtonTitleStyle}
                onPress={() => navigate("Login")}
              />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}
