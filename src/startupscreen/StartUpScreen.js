import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  UIManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Overlay} from 'react-native-elements';
import {styles} from '../../assets/style/stylesStartUpScreen';
import {source3} from '../common/Common';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  btnGradientColorLeft,
  btnGradientColorRight,
  modalBtnGradientColorRight,
} from '../../assets/style/stylesCommonValues';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class StartUpScreen extends Component {
  intervalId = 0;
  overlayVisible = true;
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
      this.scrollView.scrollTo({
        x: scrollValue,
        animated: true,
        useNativeDriver: true,
      });
    }, 3000);
  };
  componentWillUnmount = () => {
    clearInterval(this.intervalId);
    this.overlayVisible = false;
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <StatusBar hidden={true} />
        <ScrollView
          ref={(scrollView) => {
            this.scrollView = scrollView;
          }}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          decelerationRate={0.1}
          bounces={false}>
          <ImageBackground
            source={source3}
            style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}
          />
        </ScrollView>
        <View>
          <Overlay
            fullScreen={true}
            isVisible={this.overlayVisible}
            windowBackgroundColor="rgb(0, 0, 0, .5)"
            overlayStyle={styles.overlayContainerstyle}
            overlayBackgroundColor="transparent">
            <View style={styles.overlaySubContainerstyle}>
              <View style={styles.headerViewContainer}>
                <Text style={styles.textStyle}>WELCOME TO</Text>
                <Text style={styles.logoText}>DIETREPO</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="SIGN UP"
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: [btnGradientColorLeft, modalBtnGradientColorRight],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 0.5},
                  }}
                  containerStyle={styles.buttonContainerStyle}
                  buttonStyle={styles.signUpButtonStyle}
                  titleStyle={styles.signUpButtonTitleStyle}
                  onPress={() => navigate('SignUp')}
                />
                <Button
                  title="LOG IN"
                  containerStyle={styles.buttonContainerStyle}
                  buttonStyle={styles.loginButtonStyle}
                  titleStyle={styles.loginButtonTitleStyle}
                  onPress={() => navigate('Login')}
                />
              </View>
            </View>
          </Overlay>
        </View>
      </View>
    );
  }
}
