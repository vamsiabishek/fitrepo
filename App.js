/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {AppContainer} from './src/tabNavigation/TabNavigationWrapper';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  componentDidMount = () => {
    SplashScreen.hide();
  };

  render() {
    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <AppContainer />
      </React.Fragment>
    );
  }
}

export default App;
