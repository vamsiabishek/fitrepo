import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
//import { meals } from "./meals";
import { styles } from "../../../assets/style/stylesMealContainer";
import Icon from "react-native-vector-icons/Octicons";
import Timeline from "react-native-timeline-listview";


export default class MealsContainer extends Component {
  constructor(props) {
    super(props);

   // if(meals.length > 0)
   //   meals.map(meal => meal.icon = require("../../../assets/images/dish.png"));

    this.state = {
      setIconUp: false,
      selected: null
    };
  }

 /* renderHeader = meal => {
    const triangleArrow = this.state.setIconUp
      ? "triangle-down"
      : "triangle-up";
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{meal.name}</Text>
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
  }; */

  renderSelected = () => {
    /* if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{" "}
          {this.state.selected.time}
        </Text>
      ); */
  };

  onEventPress = data => {
    this.setState({ selected: data });
  };

  renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.name}</Text>;
    var desc = null;
    if (rowData.sources)
      desc = (
        <View style={styles.descriptionContainer}>
          <View style={styles.mealItem}>
            <Text style={styles.mealItemName} />
            <Text style={styles.mealItemQuantityLabel}>Quantity</Text>
          </View>
          {rowData.sources.map((source, index) => {
            let metricUnit = 'gm';
            if (source.isPerSingleUnit) metricUnit = '';
            if (source.hasTableSpoon) metricUnit = 'tbsp';
            return (
              <View style={styles.mealItem} key={index}>
                <Text style={styles.mealItemName}>{source.name}</Text>
                <Text style={styles.mealItemQuantity}>
                  {source.macroValue} {metricUnit}
                </Text>
              </View>
            );
          })}
        </View>
      );

    return (
      <View style={styles.mealContainer}>
        {title}
        {desc}
      </View>
    );
  };

  render() {
    const { meals } = this.props;
    if(meals.length > 0)
      meals.map(meal => meal.icon = require("../../../assets/images/dish.png"));
    return (
      <ScrollView style={{ backgroundColor: "#494b50", }}>
        {this.renderSelected()}
        <Timeline
          style={styles.list}
          data={meals}
          circleSize={35}
          circleColor="#00DB8D"
          lineColor="grey"
          timeStyle={{
            textAlign: "center",
            color: "white",
            borderRadius: 13
          }}
          descriptionStyle={{ color: "gray" }}
          options={{
            style: { paddingTop: 5 },
            enableEmptySections: true
          }}
          showTime="false"
          innerCircle={"icon"}
          //dotColor="skyblue"
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
      </ScrollView>
    );
  }
}
