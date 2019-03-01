import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import DietGoalPlan from './DietGoalPlan';

export default class Diet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DietGoalPlan />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})