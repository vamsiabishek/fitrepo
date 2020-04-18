import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedText from './AnimatedText';
import {styles} from '../../assets/style/stylesLoading';
import {SCREEN_HEIGHT} from '../../assets/style/stylesCommonValues';

export default class Loading extends React.Component {
  render() {
    const {
      text,
      isTextBold,
      isTextNotAvailable,
      animationStr,
      // animationHeight,
      takeFullHeight,
    } = this.props;
    let {mainContainer, textStyle} = styles; // watermelonAnimationStyle
    if (isTextBold === false) {
      textStyle = {
        ...textStyle,
        fontWeight: 'normal',
      };
    }
    if (takeFullHeight) {
      mainContainer = {
        ...mainContainer,
        height: SCREEN_HEIGHT,
      };
    }
    /*if (animationHeight !== undefined) {
      watermelonAnimationStyle = {
        ...watermelonAnimationStyle,
        height: animationHeight,
      };
    }*/
    return (
      <View>
        <View style={mainContainer}>
          <LottieView
            source={animationStr}
            autoPlay
            loop
            resizeMode="cover"
            // style={watermelonAnimationStyle}
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
        {!isTextNotAvailable ? (
          <AnimatedText text={text} textStyle={textStyle} />
        ) : undefined}
      </View>
    );
  }
}
