import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import SourceSelector from "./SourceSelector"

const styles = StyleSheet.create({
  mainContent: {
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
});

export default class FoodSources extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedProteinSources: [
        { name: "Chicken breast" },
        { name: "Salmon" },
        { name: "Tilapia" },
        { name: "Chicken breast1" },
      ],
      selectedCarbSources: [
        { name: "White rice" },
        { name: "Chapati" },
        { name: "Rajma" },
        { name: "Chicken breast2" },
      ],
      selectedFatSources: [
        { name: "Chia seeds" },
        { name: "Flax seeds" },
        { name: "Almonds" },
        { name: "Chicken breast3" },
      ],

    }
  }
  removeProteinSource = index => {
    let {selectedProteinSources} = this.state;
    if (index > -1)
      selectedProteinSources.splice(index,1);
    this.setState({selectedProteinSources})
  }
  removeCarbSource = index => {
    let {selectedCarbSources} = this.state;
    if (index > -1)
    selectedCarbSources.splice(index,1);
    this.setState({selectedCarbSources})
  }
  removeFatSource = index => {
    let {selectedFatSources} = this.state;
    if (index > -1)
    selectedFatSources.splice(index,1);
    this.setState({selectedFatSources})
  }
  render() {
    const {selectedProteinSources, selectedCarbSources, selectedFatSources} = this.state
    return (
      <View style={styles.mainContent}>
        <SourceSelector selectedSources={selectedProteinSources} removeSource={this.removeProteinSource} selectText="Protein"/>
        <SourceSelector selectedSources={selectedCarbSources} removeSource={this.removeCarbSource} selectText="Carbs"/>
        <SourceSelector selectedSources={selectedFatSources} removeSource={this.removeFatSource} selectText="Fat"/>
      </View>
    );
  }
}
