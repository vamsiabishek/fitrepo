import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import { Input, Button, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import TotalDietMacros from './TotalDietMarcos'

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: "training" // others days can be rest or refeed
    };
  }

  onDayChange = selectedDay => {
    if (selectedDay === "training") this.setState({ activeDay: "training" });
    else if (selectedDay === "rest") this.setState({ activeDay: "rest" });
  };

  render() {
    const { activeDay } = this.state;
    const subHeaderLeftText = "Week 1";
    const subHeaderCenterText = "Week 2";
    const subHeaderRightText = "Week 3";
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#222930",
            justifyContent: "space-between",
            paddingVertical: 20,
            marginTop: 0,
            width: "100%"
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => navigation.navigate("Diet")}
            >
              <Icon name="angle-left" size={30} color="#3498DB" />
              <Text
                style={{
                  color: "#3498DB",
                  fontSize: 18,
                  marginTop: 4,
                  marginLeft: 2
                }}
              >
                {subHeaderLeftText}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: "#3498DB",
                fontSize: 18,
                marginTop: 4,
                marginLeft: 2
              }}
            >
              {subHeaderCenterText}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", marginRight: 10 }}
              onPress={() => navigation.navigate("Diet")}
            >
              <Text
                style={{
                  color: "#3498DB",
                  fontSize: 18,
                  marginTop: 4,
                  marginRight: 2
                }}
              >
                {subHeaderRightText}
              </Text>
              <Icon name="angle-right" size={30} color="#3498DB" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "#221E1D", }}>
          <TouchableOpacity
            style={
              activeDay === "training" ? styles.activeDayButton : styles.dayButton
            }
            onPress={() => this.onDayChange("training")}
          >
            <Icon name="running" size={20} color="white" />
            <Text
              style={
                activeDay === "training"
                  ? styles.activeDayButtonText
                  : styles.dayButtonText
              }
            >
              Traning Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeDay === "rest" ? styles.activeDayButton : styles.dayButton}
            onPress={() => this.onDayChange("rest")}
          >
            <Text
              style={
                activeDay === "rest"
                  ? styles.activeDayButtonText
                  : styles.dayButtonText
              }
            >
              Rest Day
            </Text>
            <Icon name="procedures" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TotalDietMacros protein='75' carbs='100' fat='20' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  activeDayButton: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#E25D33",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row"
  },
  dayButton: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#e77d5b",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row"
  },
  activeDayButtonText: {
    fontSize: 15,
    color: "white",
    paddingHorizontal: 5,
    fontWeight: "bold"
  },
  dayButtonText: {
    fontSize: 15,
    color: "white",
    paddingHorizontal: 5
  }
});
