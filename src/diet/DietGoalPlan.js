import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import NumericInput from 'react-native-numeric-input'

export default class DietGoalPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goalDefaultValue: 'Select goal',
      selectedGoal: '',
      goals: [{
        value: 'Fat-loss',
      },{
        value: 'Weight-gain',
      }],
      currentWeight: 75,
      targetWeight: 75,
    }
  }

  onGoalChange = (value, index) => {
    this.setState({
      goal: value,
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Dropdown
          label={this.state.goalDefaultValue}
          data={this.state.goals}
          containerStyle={{width:300, padding:10 }}
          dropdownOffset={{top:100, left:0}}
        />
        <View style={{flex:1, flexDirection: 'row'}}>
          <Text style={{marginVertical:15, marginHorizontal:10}}>Current weight:</Text>
          <NumericInput 
              value={this.state.currentWeight} 
              onChange={value => this.setState({currentWeight: value})}
              initValue={this.state.currentWeight}
              totalWidth={80} 
              totalHeight={40} 
              iconSize={25}
              step={1.5}
              valueType='integer'
              rounded 
              textColor='black' 
              iconStyle={{ color: 'white' }} 
              rightButtonBackgroundColor='grey' 
              leftButtonBackgroundColor='grey'/>
        </View>
      </View>
    )
  }
}
