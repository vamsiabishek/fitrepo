import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../../assets/style/stylesResendButton';

class ResendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resendBtnTime: 5,
    };
    this.resendInterval = null;
  }
  componentDidMount() {
    const {resendBtnTime} = this.state;
    setTimeout(() => {
      if (resendBtnTime > 0) {
        this.setState({resendBtnTime: resendBtnTime - 1});
      }
    }, 1000);
  }
  componentDidUpdate() {
    const {resendBtnTime} = this.state;
    this.resendInterval = setInterval(() => {
      if (this.resendInterval) {
        clearInterval(this.resendInterval);
      }
      if (resendBtnTime > 0) {
        this.setState({resendBtnTime: resendBtnTime - 1});
      }
    }, 1000);
  }
  componentWillUnmount() {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }
  render() {
    const {resendBtnTime} = this.state;
    const {resendCode} = this.props;
    return (
      <View style={styles.container}>
        {resendBtnTime > 0 ? (
          <Button
            title={'Resend OTP in ' + resendBtnTime}
            titleStyle={styles.resendButtonCountdownStyle}
            type="clear"
            disabled={true}
          />
        ) : (
          <Button
            title={'Resend OTP '}
            titleStyle={styles.resendButtonStyle}
            type="clear"
            onPress={() => resendCode()}
          />
        )}
      </View>
    );
  }
}

export default ResendButton;
