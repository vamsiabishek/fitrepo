import {StyleSheet, Dimensions} from 'react-native';
import {styleCommon} from './stylesCommonValues';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "#28292B"
    //backgroundColor: "#0a1915"
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
    //marginTop: 40,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleContainer: {
    color: styleCommon.textColor1, // "white", //"#717173",
    fontFamily: 'Billabong',
    fontSize: 60,
  },
  textContainer: {
    color: styleCommon.textColor1,
    //color: "white"
    //color: "#15211d"
  },
  viewDDContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 60,
    //backgroundColor: "#494b50",
    //backgroundColor: "#0d241f",
    //backgroundColor: "#24443d",
    backgroundColor: styleCommon.secondaryColor,
    //borderWidth: 1,
    //borderColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  vegButtonGroup: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor, // "#494b50"
  },
  goalButtonGroup: {
    height: 70,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor, //"#494b50"
  },
  buttonGroupStyle: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor,
  },
  dropdownContainer: {
    width: 300,
    marginTop: 15,
  },
  weightContainer: {
    flexDirection: 'row',
    width: 300,
    marginTop: 20,
  },

  labelContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  labelText: {
    fontSize: 15,
    color: styleCommon.textColor1,
  },
  selectedOptionLabel: {
    fontSize: 15,
    color: styleCommon.textColor1,
  },
  selectedButtonStyle: {
    backgroundColor: styleCommon.selectedButtonColor,
    alignItems: 'center',
  },
  dropdownBaseColor: {
    color: 'black',
  },
  dropdownOffset: {
    top: 20,
    left: 0,
  },
  dropdownPickerStyle: {
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 30,
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 30,
    fontSize: 16,
  },
  numericInputContainer: {
    marginLeft: 10,
  },
  numberPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  inputStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  nextButtonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 40,
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: styleCommon.secondaryButtonColor, //"#00EF9A"
  },
  nextButtonTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    //color: "white"
    color: styleCommon.secondaryButtonTextColor, //"#414c47"
    // color: "#0A1915"
  },
  veg: {
    backgroundColor: styleCommon.selectedButtonColor, //"#00EF9A",
    borderRadius: 25,
    width: '110%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nonVeg: {
    backgroundColor: styleCommon.selectedButtonColor, //"#00EF9A",
    borderRadius: 25,
    width: '110%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export {styles};
