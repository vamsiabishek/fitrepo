import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
//import { meals } from "./meals";
import { styles } from "../../../assets/style/stylesMealContainer";
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
    this.onLoadAnimatedValue = new Animated.Value(0);
  }

  componentDidUpdate = () => {
    Animated.timing(this.onLoadAnimatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease
    }).start(() => (this.onLoadAnimatedValue = new Animated.Value(0)));
  };

  shouldComponentUpdate = nextProps => {
    return this.props.meals !== nextProps.meals;
  };

  handlePressIn = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease
    }).start();
  };
  handlePressOut = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease
    }).start();
  };

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
    const rotateX = this.onLoadAnimatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "180deg", "360deg"]
    });
    const onLoadAnimatedStyle = {
      transform: [{ rotateX }]
    };
    if (rowData.sources)
      desc = (
        <View style={styles.descriptionContainer}>
          <View style={styles.mealItem}>
            <Text style={styles.mealItemName} />
            <Text style={styles.mealItemQuantityLabel}>Quantity</Text>
          </View>
          {rowData.sources.map((source, index) => {
            let metricUnit = "gm";
            if (source.isPerSingleUnit) metricUnit = "";
            if (source.hasTableSpoon) metricUnit = "tbsp";
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
      <Animated.View style={[styles.mealContainer, onLoadAnimatedStyle]}>
        {title}
        {desc}
      </Animated.View>
    );
  };

  render() {
    const { meals, dayBarScrollY, onDayBarCollapse, } = this.props;
    if (meals.length > 0)
      meals.map(
        meal => (meal.icon = require("../../../assets/images/meal_1.png"))
      );
    return (
      <ScrollView
        removeClippedSubviews={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: dayBarScrollY
                }
              }
            }
          ],
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={e => {
          // scroll animation ended
          onDayBarCollapse(e);
        }}
      >
        {/*this.renderSelected()*/}
        <Timeline
          style={styles.list}
          data={meals}
          circleSize={35}
          circleColor="#00DB8D"
          //circleColor="white"
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
          //onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
      </ScrollView>
    );
  }
}
