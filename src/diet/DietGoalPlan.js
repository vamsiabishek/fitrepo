import React, { Component } from "react";
import {StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import NumericInput from "react-native-numeric-input";

export default class DietGoalPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalDefaultValue: "Choose goal !",
      selectedGoal: "",
      goals: [
        {
          value: "Fat-loss"
        },
        {
          value: "Weight-gain"
        }
      ],
      programs: [
        { value: "4 Week Program" },
        { value: "8 Week Program" },
        { value: "12 Week Program" }
      ],
      programDefaultValue: "Choose Program !",
      currentWeight: 75,
      targetWeight: 75
    };
  }

  onGoalChange = (value, index) => {
    this.setState({
      goal: value
    });
  };

  render() {
    const { onLevelChange } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyCentent: 'center', alignItems: 'center', marginVertical: 70 }}>
          <Text style={{fontSize: 30, fontWeight:'bold', fontStyle:'italic', color:'grey'}}>Getting started...</Text>
        </View>
        <Dropdown
          label={this.state.goalDefaultValue}
          data={this.state.goals}
          containerStyle={styles.dropdown}
          dropdownOffset={{ top: 20, left: 0 }}
        />
        <Dropdown
          label={this.state.programDefaultValue}
          data={this.state.programs}
          containerStyle={styles.dropdown}
          dropdownOffset={{ top:20, bottom: 20, left: 0 }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Current weight:
          </Text>
          <NumericInput
            value={this.state.currentWeight}
            onChange={value => this.setState({ currentWeight: value })}
            initValue={this.state.currentWeight}
            totalWidth={80}
            totalHeight={40}
            iconSize={25}
            step={1.5}
            valueType="integer"
            rounded
            textColor="black"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="grey"
            leftButtonBackgroundColor="grey"
            containerStyle={styles.numberPicker}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Target weight:
          </Text>
          <NumericInput
            value={this.state.targetWeight}
            onChange={value => this.setState({ targetWeight: value })}
            initValue={this.state.targetWeight}
            totalWidth={80}
            totalHeight={40}
            iconSize={25}
            step={1.5}
            valueType="integer"
            rounded
            textColor="black"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="grey"
            leftButtonBackgroundColor="grey"
            containerStyle={styles.numberPicker}
          />
        </View>
        <View style={{flex:1, marginTop: 40}}>
          <Button
              title="Next"
              titleStyle={{ fontWeight: 'bold', fontSize: 18, }}
            
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
                paddingHorizontal: 15,
                opacity: 0.7,
              }}
              containerStyle={{ marginVertical: 10, marginHorizontal: 20, height: 40, justifyContent: 'center', alignItems: 'flex-end', }}
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 5 }}
              onPress={() => onLevelChange(true)}
            />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  dropdown: {
    width: 300,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent:'space-between',
    marginHorizontal: 30,
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 16,
  },
  numberPicker: {
    marginRight:20
  },
})
