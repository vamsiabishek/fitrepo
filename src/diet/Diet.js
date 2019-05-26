import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import { styles } from "../../assets/style/stylesDietScreen";
import { f, database } from "../common/FirebaseConfig";
import {
  ICON_SIZE_MED,
  styleCommon
} from "../../assets/style/stylesCommonValues";
import { createKeyAndValuesFromResult } from "../common/Util";
import CustomListView from "../components/CustomListView";
import { GRADIENT_BG_IMAGE } from "../common/Common";

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
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
      currentDietOption: "myDiets",
      pupularDiets: [],
      myDiets: [],
      isLoading: false
    };
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const { uid } = await f.auth().currentUser;

    const [myDiets] = await Promise.all([
      //this.fetchPopularDiets(),
      this.fetchMyDiets(uid)
    ]);
    console.log("myDiets:", myDiets, "uid: ", uid);
    this.setState({
      uid,
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
      .ref(`diets/${userId}`)
      .orderByChild("createdDate")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          myDiets = createKeyAndValuesFromResult(results).reverse();
        }
      })
      .catch(error => {
        console.log("error while fetching my diets in Diet page", error);
      });
    if (myDiets.length > 1) {
      global.isFirstTimeUser = false;
    }
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
      isLoading,
      uid
    } = this.state;
    const { navigation } = this.props;
    const currentDiet =
      currentDietOption === "popular" ? popularDiets : myDiets;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.mainContainer}>
        {isLoading ? (
          <ActivityIndicator color={styleCommon.textColor1} size="large" />
        ) : (
          <View style={styles.container}>
            <View style={styles.buttonHeaderContainer}>
              <View style={styles.buttonContainer} />
            </View>

            <View style={styles.subHeaderContainer}>
              {/*<TouchableOpacity
                style={
                  currentDietOption === "popular"
                    ? styles.activeSubHeaderComponents
                    : styles.subHeaderComponents
                }
                onPress={() => this.setState({ currentDietOption: "popular" })}
              >
                <Text style={styles.subHeaderMenuItems}>Popular</Text>
              </TouchableOpacity> */}
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
              <View style={styles.sortContainerStyle}>
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
              <CustomListView
                uid={uid}
                diets={currentDiet}
                navigation={navigation}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    );
  }
}
