import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StringPicker from '../components/Picker/StringPicker';
import {styles} from '../../assets/style/stylesDietScreen';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import CustomListView from '../components/CustomListView';
import {
  WEIGHT_LOSS_DESC,
  WEIGHT_GAIN_DESC,
  BE_HEALTHY_DESC,
} from '../common/Common';
import Emoji from 'react-native-emoji';
import api from '../common/Api';

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      name: '',
      username: '',
      selectedSortOption: 'Newest first',
      sortOptionsArray: [
        'Newest first',
        WEIGHT_LOSS_DESC,
        WEIGHT_GAIN_DESC,
        BE_HEALTHY_DESC,
      ],
      currentDietOption: 'myDiets',
      pupularDiets: [],
      myDiets: [],
      isLoading: false,
      showSortPicker: false,
    };
    this.currentDietList = [];
  }
  componentDidMount = async () => {
    this.setState({isLoading: true});
    await this.fetchMyDiets();
  };

  fetchMyDiets = async () => {
    const {navigate} = this.props.navigation;
    console.log('fetching user diets');
    const response = await api.get('/userDiets');
    if (response.isUserLoggedIn !== undefined && !response.isUserLoggedIn) {
      console.log('User not logged in - navigating to login page.');
      navigate('Login');
    } else {
      const {uid} = await api.get('/getLoggedInUser');
      console.log('uid: ', uid);
      const {diets} = response;
      console.log('user diets are ', diets);
      this.currentDietList = diets;
      this.setState({
        uid,
        myDiets: diets,
        isLoading: false,
      });
    }
  };

  onSortChange = (selectedSort) => {
    const {myDiets} = this.state;
    this.currentDietList = [];
    myDiets.map((diet) => {
      console.log('diet: ', diet);
      if (selectedSort === WEIGHT_LOSS_DESC && diet.selectedGoal === 0) {
        this.currentDietList.push(diet);
      } else if (selectedSort === WEIGHT_GAIN_DESC && diet.selectedGoal === 2) {
        this.currentDietList.push(diet);
      } else if (selectedSort === BE_HEALTHY_DESC && diet.selectedGoal === 1) {
        this.currentDietList.push(diet);
      } else if (selectedSort === 'Newest first') {
        this.currentDietList = myDiets;
      }
    });

    this.setState({selectedSortOption: selectedSort, showSortPicker: false});
  };
  showSortPicker = () => {
    this.setState({showSortPicker: true});
  };
  hideSortPicker = () => {
    this.setState({showSortPicker: false});
  };

  render() {
    const {
      selectedSortOption,
      isLoading,
      showSortPicker,
      sortOptionsArray,
      uid,
    } = this.state;
    const {navigation} = this.props;
    const hasDiets = this.currentDietList.length;
    return (
      <View style={styles.mainContainer}>
        {isLoading ? (
          <ActivityIndicator color={styleCommon.textColor1} size="large" />
        ) : (
          <View style={styles.container}>
            {hasDiets ? (
              <View>
                <View style={styles.buttonHeaderContainer}>
                  <View style={styles.buttonContainer} />
                </View>

                <View style={styles.subHeaderContainer}>
                  <TouchableOpacity
                    style={styles.activeSubHeaderComponents}
                    onPress={() =>
                      this.setState({currentDietOption: 'myDiets'})
                    }>
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
                        selectedSortOption === 'Newest first'
                          ? styles.filterButtonStyle
                          : styles.activeFilterButtonStyle
                      }
                      titleStyle={
                        selectedSortOption === 'Newest first'
                          ? styles.filterButtonTitle
                          : styles.activeFilterButtonTitle
                      }
                      icon={
                        <Icon
                          name={
                            selectedSortOption === 'Newest first'
                              ? 'filter-outline'
                              : 'filter'
                          }
                          size={ICON_SIZE_MED}
                          style={
                            selectedSortOption === 'Newest first'
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
                    onRefresh={this.fetchMyDiets}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.createNewMessageContainer}>
                <Text style={styles.createNewMessageTitle}>
                  Get started by clicking on + icon below
                </Text>
                <Icon size={Platform.OS === 'android' ? 100 : 150}>
                  <Emoji name={'female-cook'} />
                </Icon>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
