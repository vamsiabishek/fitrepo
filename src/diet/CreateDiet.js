import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { f, database } from "../common/FirebaseConfig";
import DietGoalPlan from "./DietGoalPlan";
import SelectFoodSources from "./SelectFoodSources";
import { styles } from "../../assets/style/stylesCreateDiet";
import { designDiet } from "../diet/Algorithm/DietAlgorithm";

export default class CreateDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionLevel: 1,
      totalLevels: 2,
      selectedProteinSources: [],
      selectedFatSources: [],
      selectedCarbSources: [],
      selectedGoal: "",
      selectedProgram: "",
      selectedMeals: "",
      currentWeight: 75,
      targetWeight: 75,
      isVeg: false,
      isLoading: false
    };
  }

  changeSelectionLevel = progress => {
    const { selectionLevel, totalLevels } = this.state;
    const nextLevel = progress ? selectionLevel + 1 : selectionLevel - 1;
    if (nextLevel > 0 && nextLevel <= totalLevels) {
      this.setState({ selectionLevel: nextLevel });
    }
  };

  setSelectedSources = ({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources,
    progress
  }) => {
    this.setState({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    });
    this.changeSelectionLevel(progress);
  };

  setDietGoals = ({
    selectedGoal,
    selectedProgram,
    currentWeight,
    targetWeight,
    selectedMeals,
    progress
  }) => {
    this.setState({
      selectedGoal,
      selectedProgram,
      currentWeight,
      targetWeight,
      selectedMeals
    });
    this.changeSelectionLevel(progress);
  };

  saveDietGoalsPlusBack = ({
    selectedGoal,
    selectedProgram,
    currentWeight,
    targetWeight,
    selectedMeals,
    progress
  }) => {
    this.setState({
      selectedGoal,
      selectedProgram,
      currentWeight,
      targetWeight,
      selectedMeals
    });
    this.changeSelectionLevel(progress);
    this.props.navigation.navigate("Diet");
  };

  createDiet = async ({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources
  }) => {
    this.setState({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    });
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      isVeg
    } = this.state;
    this.setState({ isLoading: true });
    const { uid } = await f.auth().currentUser;
    const completeDietOptions = {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      isVeg,
      uid
    };

    //create diet using these options
    const mealDetails = await designDiet(completeDietOptions);
    const {
      calFromProtein,
      calFromProteinForRD,
      calFromCarbs,
      calFromCarbsForRD,
      calFromFats,
      calFromFatsForRD
    } = mealDetails;

    const traningDayCal = calFromProtein + calFromCarbs + calFromFats;
    const restDayCal =
      calFromProteinForRD + calFromCarbsForRD + calFromFatsForRD;

    const dietDetails = {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      traningDayCal,
      restDayCal,
      isVeg,
      userId: uid
    };

    //save diet and meals
    const dietId = await this.saveDietAndMeals({ dietDetails, mealDetails });

    this.props.navigation.navigate("MyDiet", { dietId });
  };

  saveDietAndMeals = async ({ dietDetails, mealDetails }) => {
    let dietId = "";
    let dietAndMeals = {};
    await database
      .ref("diets")
      .push({
        ...dietDetails,
        createdDate: f.database.ServerValue.TIMESTAMP,
        likes: 0
      })
      .then(res => {
        dietId = res.key;
      })
      .catch(error => {
        console.log("error while saving new diet:", error);
        this.setState({ isLoading: false });
      });
    await database
      .ref("meals")
      .push({ ...mealDetails, dietId })
      .then(res => {
        console.log("Successfully saved diet and meals");
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("error while saving meals to the diet:", error);
        this.setState({ isLoading: false });
      });
    return dietId;
  };

  render() {
    const {
      selectionLevel,
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      selectedGoal,
      selectedProgram,
      currentWeight,
      targetWeight,
      selectedMeals,
      isLoading
    } = this.state;
    const name = this.props.navigation.getParam("screenName");
    return (
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}
        <View>
        {!isLoading && selectionLevel === 1 && (
         
            <DietGoalPlan
            onLevelChange={this.changeSelectionLevel}
            goal={selectedGoal}
            program={selectedProgram}
            currentWeight={currentWeight}
            targetWeight={targetWeight}
            meals={selectedMeals}
            setDietGoals={this.setDietGoals}
            saveDietGoalsPlusBack={this.saveDietGoalsPlusBack}
            screenName={name}
          />
        )}
        </View>
        <View>
        {!isLoading && selectionLevel === 2 && (
         
            <SelectFoodSources
            selectedProteins={selectedProteinSources}
            selectedFats={selectedFatSources}
            selectedCarbs={selectedCarbSources}
            setSelectedSources={this.setSelectedSources}
            createDiet={this.createDiet}
            screenName={name}
          />
          
        )}
        </View>
      </View>
    );
  }
}
