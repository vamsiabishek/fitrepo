import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { meals } from "./meals";
import { styles } from "../../../assets/style/stylesMealContainer";
import Icon from "react-native-vector-icons/Octicons";

export default class MealsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals,
      activeSections: [0],
      setIconUp: false
    };
  }

  renderHeader = meal => {
    const triangleArrow = this.state.setIconUp ? "triangle-down" : "triangle-up";
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{meal.title}</Text>
        <Icon name={triangleArrow} size={18} style={styles.headerIcon} />
      </View>
    );
  };

  renderContent = meal => {
    return (
      <View style={styles.content}>
        <View style={styles.mealItem}>
          <Text style={styles.mealItemName} />
          <Text style={styles.mealItemQuantityLabel}>Quantity</Text>
        </View>
        {meal.data.map((item, index) => {
          return (
            <View style={styles.mealItem} key={index}>
              <Text style={styles.mealItemName}>{item.name}</Text>
              <Text style={styles.mealItemQuantity}>{item.quantity} gm</Text>
            </View>
          );
        })}
      </View>
    );
  };

  setSections = activeSections => {
    this.setState({ activeSections });
    this.setState({ setIconUp: true });
  };

  render() {
    const multipleSelect = true;
    const { meals, activeSections, setIconUp } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#36373A" }}>
        <Accordion
          activeSections={activeSections}
          sections={meals}
          expandMultiple={multipleSelect}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          onChange={this.setSections}
        />
      </ScrollView>
    );
  }
}
