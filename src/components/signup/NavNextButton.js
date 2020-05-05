import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  btnGradientColorLeft,
  btnGradientColorRight,
  btnGradientColorRightDisabled,
  ICON_SIZE_LARGE,
} from '../../../assets/style/stylesCommonValues';
import {styles} from '../../../assets/style/stylesNavNextButton';

class NavNextButton extends React.Component {
  render() {
    let gradientColorRight = btnGradientColorRightDisabled;
    const {isActive, screen, onNext, buttonText, hasBottomBar} = this.props;
    let {bottomNav} = styles;
    let {marginBottom} = styles.bottomNav;
    if (isActive) {
      gradientColorRight = btnGradientColorRight;
    }
    if (hasBottomBar) {
      bottomNav = {
        ...bottomNav,
        marginBottom: marginBottom + 60,
      };
    }
    return (
      <View style={bottomNav}>
        <Button
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: [btnGradientColorLeft, gradientColorRight],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          buttonStyle={
            isActive ? styles.navButtonActive : styles.navButtonDisabled
          }
          titleStyle={isActive ? styles.activeButtonTitle : styles.buttonTitle}
          title={buttonText ? buttonText : 'NEXT'}
          icon={
            <Icon
              name="chevron-right"
              size={ICON_SIZE_LARGE}
              style={styles.navButtonIcon}
            />
          }
          iconRight
          onPress={() => onNext(screen)}
        />
      </View>
    );
  }
}

export default NavNextButton;
