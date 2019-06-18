import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StringPicker from "../components/Picker/StringPicker";
import { styles } from "../../assets/style/stylesDietScreen";
import { database } from "../common/FirebaseConfig";
import {
  ICON_SIZE,
  styleCommon,
  ICON_SIZE_MED
} from "../../assets/style/stylesCommonValues";
import { createKeyAndValuesFromResult, getCurrentUser, setFirstTimeUser, getFirstTimeUser } from "../common/Util";
import CustomListView from "../components/CustomListView";
import {
  GRADIENT_BG_IMAGE,
  WEIGHT_LOSS_DESC,
  WEIGHT_GAIN_DESC,
  BE_HEALTHY_DESC
} from "../common/Common";

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      username: "",
      selectedSortOption: "Newest first",
      sortOptionsArray: [
        "Newest first",
        WEIGHT_LOSS_DESC,
        WEIGHT_GAIN_DESC,
        BE_HEALTHY_DESC
      ],
      currentDietOption: "myDiets",
      pupularDiets: [],
      myDiets: [],
      isLoading: false,
      showSortPicker: false
    };
    this.currentDietList = [];
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let { uid } = "";
    const user = await getCurrentUser("user_data");
    if (user) {
      console.log("uid:", user.uid);
      uid = user.uid;
    }

    const [myDiets] = await Promise.all([this.fetchMyDiets(uid)]);
    console.log("myDiets:", myDiets, "uid: ", uid);
    this.currentDietList = myDiets;
    this.setState({
      uid,
      myDiets,
      isLoading: false
    });
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
      setFirstTimeUser(false);
      //alert(getFirstTimeUser())
    }
    return myDiets;
  };

  onSortChange = selectedSort => {
    const { myDiets } = this.state;
    this.currentDietList = [];
    myDiets.map(diet => {
      if (selectedSort === WEIGHT_LOSS_DESC && diet.value.selectedGoal === 0) {
        this.currentDietList.push(diet);
      } else if (
        selectedSort === WEIGHT_GAIN_DESC &&
        diet.value.selectedGoal === 2
      ) {
        this.currentDietList.push(diet);
      } else if (
        selectedSort === BE_HEALTHY_DESC &&
        diet.value.selectedGoal === 1
      ) {
        this.currentDietList.push(diet);
      } else if (selectedSort === "Newest first") {
        this.currentDietList = myDiets;
      }
    });

    this.setState({ selectedSortOption: selectedSort, showSortPicker: false });
  };
  showSortPicker = () => {
    this.setState({ showSortPicker: true });
  };
  hideSortPicker = () => {
    this.setState({ showSortPicker: false });
  };

  render() {
    const {
      selectedSortOption,
      currentDietOption,
      isLoading,
      showSortPicker,
      sortOptionsArray,
      uid
    } = this.state;
    const { navigation } = this.props;
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
              <TouchableOpacity
                style={styles.activeSubHeaderComponents}
                onPress={() => this.setState({ currentDietOption: "myDiets" })}
              >
                <Text style={styles.subHeaderMenuItems}>My Diets</Text>
              </TouchableOpacity>
              <View style={styles.sortContainerStyle}>
                <StringPicker
                  pickerHeading="Pick an option to filter your diets"
                  stringArray={sortOptionsArray}
                  isVisible={showSortPicker}
                  selectedStr={selectedSortOption}
                  onConfirm={this.onSortChange}
                  onCancel={this.hideSortPicker}
                />
                <Button
                  title={selectedSortOption}
                  containerStyle={styles.filterButtonContainerStyle}
                  buttonStyle={
                    selectedSortOption === "Newest first"
                      ? styles.filterButtonStyle
                      : styles.activeFilterButtonStyle
                  }
                  titleStyle={
                    selectedSortOption === "Newest first"
                      ? styles.filterButtonTitle
                      : styles.activeFilterButtonTitle
                  }
                  icon={
                    <Icon
                      name={
                        selectedSortOption === "Newest first"
                          ? "filter-outline"
                          : "filter"
                      }
                      size={ICON_SIZE_MED}
                      style={
                        selectedSortOption === "Newest first"
                          ? styles.filterButtonIcon
                          : styles.activeFilterButtonIcon
                      }
                    />
                  }
                  iconRight
                  onPress={this.showSortPicker}
                />
              </View>
            </View>
            <View style={styles.listViewContainer}>
              <CustomListView
                uid={uid}
                diets={this.currentDietList}
                navigation={navigation}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    );
  }
}
