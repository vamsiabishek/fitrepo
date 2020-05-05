import {Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  motherContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    // backgroundColor: "#28292B",
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    //backgroundColor: "#FFD80A"
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 60,
    fontFamily: 'Billabong',
  },
  inputOuterViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 40,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 50,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  inputGradientContainer: {
    borderColor: 'transparent',
    borderRadius: 60,
    marginBottom: 5,
  },
  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    borderColor: 'transparent',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    //height: 45,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    color: 'black', // "#44484E",
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonGradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 40,
    height: 45,
    backgroundColor: '#00DB8D',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  signUpButtonIconStyle: {
    paddingLeft: 5,
    color: 'white',
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    //backgroundColor: "#4394c6"
  },
  alreadyAccountText: {
    fontSize: 16,
    color: 'white',
  },
  loginButtonStyle: {
    paddingHorizontal: 2,
  },
  loginHereText: {
    color: '#00DB8D', //Green Button
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export {styles};
