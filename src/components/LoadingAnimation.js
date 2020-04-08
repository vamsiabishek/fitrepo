import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedText from './AnimatedText';
import {styles} from '../../assets/style/stylesLoadingAnimation';

export default class LoadingAnimation extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <LottieView
          source={require('../../assets/jsons/watermelon.json')}
          autoPlay
          loop
          style={styles.watermelonAnimationStyle}
        />
        <View style={styles.textViewContainer}>
          <AnimatedText
            text={'We are creating your diet ...'}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    );
  }
}
