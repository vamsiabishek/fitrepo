import React, { Component } from "react";
import { Text, View, ScrollView, Switch } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { proteinSources, fatSources, carbSources } from "./FoodSources";
import { styles } from "../../assets/style/stylesSelectFoodSources";

export default class SelectFoodSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proteinSources,
      fatSources,
      carbSources,
      isNonVegetarian: true,
      selectedProteinSources: props.selectedProteins,
      selectedFatSources: props.selectedFats,
      selectedCarbSources: props.selectedCarbs
    };
  }

  onPreviousOrNextClick = progress => {
    const {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    } = this.state;
    const { setSelectedSources } = this.props;
    setSelectedSources({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      progress
    });
  };

  createDiet = () => {
    const {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    } = this.state;
    const { createDiet } = this.props;
    createDiet({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    });
  };

  onVegChange = value => {
    this.setState({
      isNonVegetarian: value
    });
  };

  onProteinSelectedChange = selectedProteinSources => {
    this.setState({ selectedProteinSources });
  };
  onCarbSelectedChange = selectedCarbSources => {
    this.setState({ selectedCarbSources });
  };
  onFatSelectedChange = selectedFatSources => {
    this.setState({ selectedFatSources });
  };

  getConfirmText = selectedList => (selectedList.length ? "Confirm" : "Cancel");

  getSourceLabel = (selectedList, source) =>
    selectedList.length ? `${source}s !` : `Choose your ${source}!`;

  getMultiSelectStyle = source => {
    let chipBackgroundColor = "grey";
    chipBackgroundColor =
      source === "protein" ? "#F1948A" : chipBackgroundColor;
    chipBackgroundColor = source === "carb" ? "#82E0AA" : chipBackgroundColor;
    chipBackgroundColor = source === "fat" ? "#F7DC6F" : chipBackgroundColor;
    return {
      container: {
        marginVertical: 100
      },
      chipText: {
        //width of selected items
        //maxWidth: Dimensions.get('screen').width - 90,
      },
      chipContainer: {
        backgroundColor: chipBackgroundColor,
        borderWidth: 0,
        fontSize: 3
        //opacity: 0.5,
      },
      itemText: {
        color: "black",
        fontSize: 20
      },
      subItemText: {
        color: "black",
        fontSize: 15,
        paddingVertical: 5
      },
      selectedSubItemText: {
        fontWeight: "bold",
        color: "black"
      },
      selectedItem: {
        color: "red"
      }
    };
  };

  render() {
    const {
      isNonVegetarian,
      selectedProteinSources,
      proteinSources,
      fatSources,
      carbSources,
      selectedFatSources,
      selectedCarbSources
    } = this.state;
    const isVegLabel = isNonVegetarian ? "Non-Vegetarian" : "Vegetarian";
    const proteinSourceLabel = this.getSourceLabel(
      selectedProteinSources,
      "Protein"
    );
    const carbSourceLabel = this.getSourceLabel(selectedCarbSources, "Carb");
    const fatSourceLabel = this.getSourceLabel(selectedFatSources, "Fat");
    const multiSelectStyle = {};
    const proteinSourceConfirmText = this.getConfirmText(
      selectedProteinSources
    );
    const carbSourceConfirmText = this.getConfirmText(selectedCarbSources);
    const fatSourceConfirmText = this.getConfirmText(selectedFatSources);
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Food Sources...</Text>
        </View>
        <ScrollView
          style={styles.scrollviewContainer}
          contentContainerStyle={styles.scrollviewContentContainer}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{isVegLabel}</Text>
            <Switch
              onValueChange={value => this.onVegChange(value)}
              value={isNonVegetarian}
              trackColor={{ false: "green", true: "red" }}
              ios_backgroundColor="green"
            />
          </View>
          <View style={styles.multiSelectDropdown}>
            <SectionedMultiSelect
              items={proteinSources}
              uniqueKey="id"
              subKey="sources"
              selectText={proteinSourceLabel}
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onProteinSelectedChange}
              selectedItems={selectedProteinSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("protein")}
              colors={{ chipColor: "black" }}
              searchPlaceholderText="Search sources..."
              confirmText={proteinSourceConfirmText}
            />
          </View>
          <View style={styles.multiSelectDropdown}>
            <SectionedMultiSelect
              items={carbSources}
              uniqueKey="id"
              subKey="sources"
              selectText={carbSourceLabel}
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onCarbSelectedChange}
              selectedItems={selectedCarbSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("carb")}
              colors={{ chipColor: "black" }}
              searchPlaceholderText="Search sources..."
              confirmText={carbSourceConfirmText}
            />
          </View>
          <View style={styles.multiSelectDropdown}>
            <SectionedMultiSelect
              items={fatSources}
              uniqueKey="id"
              subKey="sources"
              selectText={fatSourceLabel}
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onFatSelectedChange}
              selectedItems={selectedFatSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("fat")}
              colors={{ chipColor: "black" }}
              searchPlaceholderText="Search sources..."
              confirmText={fatSourceConfirmText}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="BACK"
            containerStyle={styles.nextButtonContainerStyle}
            buttonStyle={styles.nextButtonStyle}
            titleStyle={styles.nextButtonTitleStyle}
            icon={
              <Icon
                name="arrow-left-thick"
                size={20}
                style={{ color: "white" }}
              />
            }
            iconLeft={true}
            onPress={() => this.onPreviousOrNextClick(false)}
          />
          <Button
            title="GET DIET"
            containerStyle={styles.nextButtonContainerStyleC}
            buttonStyle={styles.nextButtonStyle}
            titleStyle={styles.nextButtonTitleStyle}
            icon={
              <Icon
                name="arrow-right-thick"
                size={20}
                style={{ color: "white" }}
              />
            }
            iconRight={true}
            onPress={() => this.createDiet()}
          />
        </View>
      </View>
    );
  }
}
