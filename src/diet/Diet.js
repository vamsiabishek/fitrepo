import React, { Component } from "react";
import {
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesDietScreen";
import { f, database } from "../common/FirebaseConfig";
import { ICON_SIZE_MED } from "../common/Common";
import CustomListView from "../components/CustomListView";

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      selectedSortOption: "Newest first",
      sortOptions: [
        {
          value: "Newest first",
          id: "newest-first"
        },
        {
          value: "Rating",
          id: "rating"
        }
      ],
      currentDietList: "popular",
      diets: [
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "50",
          dietId: "diet1"
        },
        {
          goal: "Weight gain",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "10",
          dietId: "diet2"
        },
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: true,
          numberOfMeals: "5 Meals per day",
          likes: "102",
          dietId: "diet3"
        },
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "78",
          dietId: "diet4"
        }
      ]
    };
  }
  componentDidMount = async () => {
    const currentUser = await f.auth().currentUser;
    database
      .ref("users")
      .child(currentUser.uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        LayoutAnimation.easeInEaseOut();
        this.setState({
          username: userLoggedIn.username,
          name: userLoggedIn.name
        });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Diet:",
          error
        );
      });
  };

  onSortChange = selectedSort => {
    this.setState({ selectedSortOption: selectedSort });
  };

  render() {
    const {
      name,
      username,
      selectedSortOption,
      sortOptions,
      currentDietList,
      diets
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.buttonHeaderContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="CREATE NEW"
              containerStyle={styles.nextButtonContainerStyle}
              buttonStyle={styles.nextButtonStyle}
              titleStyle={styles.nextButtonTitleStyle}
              icon={
                <Icon
                  name="pencil-outline"
                  size={ICON_SIZE_MED}
                  style={styles.nextButtonIconStyle}
                />
              }
              iconRight={true}
              onPress={() =>
                this.props.navigation.navigate("CreateDiet", {
                  screenName: name
                })
              }
            />
          </View>
        </View>

        <View style={styles.subHeaderContainer}>
          <TouchableOpacity
            style={
              currentDietList === "popular"
                ? styles.activeSubHeaderComponents
                : styles.subHeaderComponents
            }
            onPress={() => this.setState({ currentDietList: "popular" })}
          >
            <Text style={styles.subHeaderMenuItems}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              currentDietList !== "popular"
                ? styles.activeSubHeaderComponents
                : styles.subHeaderComponents
            }
            onPress={() => this.setState({ currentDietList: "myDiets" })}
          >
            <Text style={styles.subHeaderMenuItems}>My Diets</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sortLabel}>Sort by</Text>
            <Dropdown
              data={sortOptions}
              baseColor={styles.dropdownBaseColor.color}
              textColor={styles.dropdownTextColor.color}
              containerStyle={styles.dropdownContainer}
              pickerStyle={styles.dropdownPickerStyle}
              dropdownOffset={styles.dropdownOffset}
              onChangeText={this.onSortChange}
              value={selectedSortOption}
            />
          </View>
        </View>
        <View style={styles.listViewContainer}>
          <CustomListView diets={this.state.diets} navigation={navigation} />
        </View>
      </View>
    );
  }
}
