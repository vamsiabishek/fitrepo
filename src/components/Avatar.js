import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Emoji from 'react-native-emoji';

export default class Avatar extends React.Component {
  render() {
    const {gender = 1, size = 80, iconSize = 50} = this.props;
    const iconName = gender === 1 ? 'man-raising-hand' : 'woman-raising-hand';
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'lightgrey',
          alignItems: 'center',
        }}>
        <Icon size={iconSize}>
          <Emoji name={iconName} />
        </Icon>
      </View>
    );
  }
}
