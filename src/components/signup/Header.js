import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  styleCommon,
  ICON_BACK_SIZE,
} from '../../../assets/style/stylesCommonValues';
import {styles} from '../../../assets/style/stylesHeader';

export default class Header extends React.Component {
  render() {
    const {
      title,
      marginTop,
      height,
      flex,
      screen,
      onBack,
      onCancel,
      showOnCancel = true,
      showOnBack = true,
    } = this.props;
    let {header} = styles;
    if (marginTop || height || flex) {
      header = {
        ...header,
        marginTop,
        flex,
        height,
      };
    }
    return (
      <View>
        <View style={styles.backHeaderContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.backButtonContainerStyle}>
              <View style={styles.backButtonStyle}>
                <TouchableOpacity onPress={() => onBack(screen)}>
                  <Icon
                    name="arrow-left-thick"
                    size={ICON_BACK_SIZE}
                    color={
                      showOnBack
                        ? styleCommon.headerIconsColor
                        : styleCommon.bgColor
                    }
                    type="material-community"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cancelButtonContainerStyle}>
              <View style={styles.cancelButtonStyle}>
                <TouchableOpacity onPress={() => onCancel()}>
                  <Icon
                    name="close"
                    size={ICON_BACK_SIZE}
                    color={
                      showOnCancel
                        ? styleCommon.headerIconsColor
                        : styleCommon.bgColor
                    }
                    type="material-community"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
    );
  }
}

Header.defaultProps = {
  showOnCancel: true,
};
