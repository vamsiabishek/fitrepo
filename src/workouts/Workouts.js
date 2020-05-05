import React, {Component} from 'react';
import {Text, ImageBackground} from 'react-native';
import {styles} from '../../assets/style/stylesWorkoutsScreen';
import {GRADIENT_BG_IMAGE} from '../common/Common';

export default class Workouts extends Component {
  render() {
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        <Text style={styles.textContainer}>Workouts Screen</Text>
      </ImageBackground>
    );
  }
}
