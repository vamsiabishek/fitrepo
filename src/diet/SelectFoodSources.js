import React, { Component } from "react";
import { Text, View, ScrollView, Switch } from "react-native";
import { Button } from "react-native-elements";
import { database } from "../common/FirebaseConfig";
import { createKeyAndNameFromResult } from "../common/Util";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { styles } from "../../assets/style/stylesSelectFoodSources";

export default class SelectFoodSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proteinSources: [],
      fatSources: [],
      carbSources: [],
      isNonVegetarian: true,
      selectedProteinSources: props.selectedProteins,
      selectedFatSources: props.selectedFats,
      selectedCarbSources: props.selectedCarbs
    };
    this.fatSelectPosition = 0;
  }

  componentDidMount = async () => {
    const [proteinSources, carbSources, fatSources] = await Promise.all([
      this.fetchProteinSources(),
      this.fetchCarbSources(),
      this.fetchFatSources()
    ]);
    // console.log(proteinSources, carbSources, fatSources);
    this.setState({
      proteinSources,
      fatSources,
      carbSources
    });
  };

  fetchProteinSources = async () => {
    let proteinSources = [];
    await database
      .ref("protein-sources")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          proteinSources = [
            {
              name: "Protein Sources",
              key: "protein",
              sources: createKeyAndNameFromResult(results)
            }
          ];
        }
      })
      .catch(error => {
        /* console.log(
          "error while fetching protein sources in select food sources page",
          error
        );*/
      });
    return proteinSources;
  };

  fetchCarbSources = async () => {
    let carbSources = [];
    await database
      .ref("carb-sources")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          carbSources = [
            {
              name: "Carbs",
              key: "carbs",
              sources: createKeyAndNameFromResult(results)
            }
          ];
        }
      })
      .catch(error => {
        /* console.log(
          "error while fetching carb sources in select food sources page",
          error
        );*/
      });
    return carbSources;
  };

  fetchFatSources = async () => {
    let fatSources = [];
    await database
      .ref("fat-sources")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          fatSources = [
            {
              name: "Fats",
              key: "fats",
              sources: createKeyAndNameFromResult(results)
            }
          ];
        }
      })
      .catch(error => {
        /* console.log(
          "error while fetching fat sources in select food sources page",
          error
        );*/
      });
    return fatSources;
  };

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
    if (this.validateSelectedSources(selectedProteinSources))
      this.setState({ selectedProteinSources });
  };
  onCarbSelectedChange = selectedCarbSources => {
    if (this.validateSelectedSources(selectedCarbSources))
      this.setState({ selectedCarbSources });
  };
  onFatSelectedChange = selectedFatSources => {
    if (this.validateSelectedSources(selectedFatSources))
      this.setState({ selectedFatSources });
    if (this.scrollView)
      this.scrollView.scrollTo({ y: this.fatSelectPosition - 250 });
  };

  validateSelectedSources = selectedSources => {
    if (selectedSources.length > 4) {
      alert("You can only select 4 sources!");
      return false;
    }
    return true;
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
        marginVertical: 100,
        backgroundColor: "white"
      },
      chipText: {
        //color: "white",
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

  getMultiSelectColors = () => {
    return { chipColor: "white", primary: "#00DB8D", text: "#4caf50" };
  };

  renderProteinSelectText = () => {
    return <Text style={{ color: "white" }}>Choose Protein ...</Text>;
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
          ref={ref => (this.scrollView = ref)}
          /*onContentSizeChange={(contentWidth, contentHeight)=>{
            this.scrollView.scrollTo({y: contentHeight});
          }} */
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
              uniqueKey="key"
              subKey="sources"
              //selectText={proteinSourceLabel}
              renderSelectText={this.renderProteinSelectText}
              showDropDowns={true}
              expandDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onProteinSelectedChange}
              selectedItems={selectedProteinSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("protein")}
              colors={this.getMultiSelectColors()}
              searchPlaceholderText="Search sources..."
              confirmText={proteinSourceConfirmText}
            />
          </View>
          <View style={styles.multiSelectDropdown}>
            <SectionedMultiSelect
              items={carbSources}
              uniqueKey="key"
              subKey="sources"
              selectText={carbSourceLabel}
              showDropDowns={true}
              expandDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onCarbSelectedChange}
              selectedItems={selectedCarbSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("carb")}
              colors={this.getMultiSelectColors()}
              searchPlaceholderText="Search sources..."
              confirmText={carbSourceConfirmText}
            />
          </View>
          <View
            style={styles.multiSelectDropdown}
            onLayout={e => {
              this.fatSelectPosition = e.nativeEvent.layout.y;
            }}
          >
            <SectionedMultiSelect
              items={fatSources}
              uniqueKey="key"
              subKey="sources"
              selectText={fatSourceLabel}
              showDropDowns={true}
              readOnlyHeadings={true}
              expandDropDowns={true}
              onSelectedItemsChange={this.onFatSelectedChange}
              selectedItems={selectedFatSources}
              modalAnimationType="slide"
              styles={this.getMultiSelectStyle("fat")}
              colors={this.getMultiSelectColors()}
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
