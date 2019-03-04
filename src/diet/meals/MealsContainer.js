import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { meals } from "./meals";
import { styles } from "../../../assets/style/stylesMealContainer";

export default class MealsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals,
      activeSections: [0]
    };
  }

  renderHeader = meal => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{meal.title}</Text>
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
  };

  render() {
    const multipleSelect = true;
    const { meals, activeSections } = this.state;
    return (
      <ScrollView>
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
