import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import TotalDietMacros from "./TotalDietMarcos";
import { styles } from "../../assets/style/stylesMyDiet";

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
        <StatusBar barStyle="light-content" />
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
              <Icon name="arrow-left-thick" size={30} color="#00DB8D" />
              <Text
                style={{
                  color: "#00DB8D",
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
                color: "#00DB8D",
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
                  color: "#00DB8D",
                  fontSize: 18,
                  marginTop: 4,
                  marginRight: 2
                }}
              >
                {subHeaderRightText}
              </Text>
              <Icon name="arrow-right-thick" size={30} color="#00DB8D" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#221E1D"
          }}
        >
          <TouchableOpacity
            style={
              activeDay === "training"
                ? styles.activeDayButton
                : styles.dayButton
            }
            onPress={() => this.onDayChange("training")}
          >
            <Icon name="run-fast" size={20} color="white" />
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
            style={
              activeDay === "rest" ? styles.activeDayButton : styles.dayButton
            }
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
            <Icon name="sleep" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TotalDietMacros protein="75" carbs="100" fat="20" />
      </View>
    );
  }
}
