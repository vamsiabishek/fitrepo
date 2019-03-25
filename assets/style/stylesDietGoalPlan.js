import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  titleContainer: {
    color: "white", //"#717173",
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: "white"
  },
  viewDDContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 60,
    backgroundColor: "#494b50",
    //borderWidth: 1,
    //borderColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  vegButtonGroup: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: "#28292B"
  },
  goalButtonGroup: {
    height: 70,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: "#28292B"
  },
  buttonGroupStyle: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: "#28292B"
  },
  dropdownContainer: {
    width: 300,
    //padding: 10,
    marginTop: 15,
    //justifyContent: "center",
    //alignItems: "center",
  },
  weightContainer: {
    flexDirection: "row",
    width: 300,
   // alignItems: "center",
    marginTop: 20,
  },

  labelContainer: {
    flexDirection:"row",
    paddingBottom:15,
  },
  labelText: {
    fontSize: 15,
    color: 'lightgrey',
    //color:"black"
  },
  selectedOptionLabel: {
    fontSize: 15,
    color: '#00DB8D',
  },
  selectedButtonStyle: {
    backgroundColor: '#00DB8D',
    alignItems:"center",
  },
  dropdownBaseColor: {
    color: "black"
  },
  dropdownOffset: {
    top: 20,
    left: 0
  },
  dropdownPickerStyle: {
    backgroundColor: "white"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 30
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 30,
    fontSize: 16
  },
  numericInputContainer:{
    marginLeft:10
  },
  numberPickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
  inputStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  nextButtonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 40
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#00DB8D"
  },
  nextButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  veg: {
    backgroundColor: '#00DB8D',
    borderRadius:25,
    width:"110%",
    alignItems:"center",
    paddingHorizontal:10
  },
  nonVeg: {
    backgroundColor: '#FF3333',
    borderRadius:25,
    width:"110%",
    alignItems:"center",
    paddingHorizontal:10
  },
});

export { styles };
