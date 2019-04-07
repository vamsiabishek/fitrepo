import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesDietScreen";
import { f, database } from "../common/FirebaseConfig";
import { ICON_SIZE_MED } from "../common/Common";
import { createKeyAndValuesFromResult } from "../common/Util";
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
      currentDietOption: "popular",
      pupularDiets: [],
      myDiets: [],
      isLoading: false,
      diets: [
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "50",
          dietId: "diet1",
          createdDate: 1553318315960
        },
        {
          goal: "Weight gain",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "10",
          dietId: "diet2",
          createdDate: 1553318315960
        },
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: true,
          numberOfMeals: "5 Meals per day",
          likes: "102",
          dietId: "diet3",
          createdDate: 1553318315960
        },
        {
          goal: "Fat loss",
          program: "12 Week program",
          isVegetarian: false,
          numberOfMeals: "5 Meals per day",
          likes: "78",
          dietId: "diet4",
          createdDate: 1553318315960
        }
      ]
    };
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const { uid } = await f.auth().currentUser;

    const [popularDiets, myDiets] = await Promise.all([
      this.fetchPopularDiets(),
      this.fetchMyDiets(uid)
    ]);
    console.log("popularDiets & myDiets:", popularDiets, myDiets);
    this.setState({
      popularDiets,
      myDiets,
      isLoading: false
    });

    /* await database
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
      }); */
  };

  fetchPopularDiets = async () => {
    let popularDiets = [];
    await database
      .ref("diets")
      .orderByChild("createdDate")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          popularDiets = createKeyAndValuesFromResult(results);
        }
      })
      .catch(error => {
        console.log("error while fetching popular diets in Diet page", error);
      });
    return popularDiets;
  };

  fetchMyDiets = async userId => {
    let myDiets = [];
    await database
      .ref("diets")
      .orderByChild("userId")
      .equalTo(userId)
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          myDiets = createKeyAndValuesFromResult(results);
        }
      })
      .catch(error => {
        console.log("error while fetching my diets in Diet page", error);
      });
    return myDiets;
  };

  onSortChange = selectedSort => {
    this.setState({ selectedSortOption: selectedSort });
  };

  render() {
    const {
      name,
      selectedSortOption,
      sortOptions,
      currentDietOption,
      popularDiets,
      myDiets,
      isLoading
    } = this.state;
    const { navigation } = this.props;
    const currentDiet =
      currentDietOption === "popular" ? popularDiets : myDiets;
    return (
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <View>
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
                  currentDietOption === "popular"
                    ? styles.activeSubHeaderComponents
                    : styles.subHeaderComponents
                }
                onPress={() => this.setState({ currentDietOption: "popular" })}
              >
                <Text style={styles.subHeaderMenuItems}>Popular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  currentDietOption !== "popular"
                    ? styles.activeSubHeaderComponents
                    : styles.subHeaderComponents
                }
                onPress={() => this.setState({ currentDietOption: "myDiets" })}
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
              <CustomListView diets={currentDiet} navigation={navigation} />
            </View>
          </View>
        )}
      </View>
    );
  }
}
