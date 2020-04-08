import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
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
      showOnCancel,
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
            <Button
              icon={{
                name: 'arrow-left-thick',
                size: ICON_BACK_SIZE,
                color: styleCommon.headerIconsColor,
                type: 'material-community',
              }}
              containerStyle={styles.backButtonContainerStyle}
              buttonStyle={styles.backButtonStyle}
              onPress={() => onBack(screen)}
            />
            {showOnCancel && (
              <Button
                icon={{
                  name: 'close',
                  size: ICON_BACK_SIZE,
                  color: styleCommon.headerIconsColor,
                  type: 'material-community',
                }}
                containerStyle={styles.cancelButtonContainerStyle}
                buttonStyle={styles.cancelButtonStyle}
                onPress={() => onCancel()}
              />
            )}
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
