import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StringPicker from '../components/Picker/StringPicker';
import {styles} from '../../assets/style/stylesDietScreen';
import {ICON_SIZE_MED} from '../../assets/style/stylesCommonValues';
import CustomListView from '../components/CustomListView';
import {
  WEIGHT_LOSS_DESC,
  WEIGHT_GAIN_DESC,
  BE_HEALTHY_DESC,
} from '../common/Common';
import LottieView from 'lottie-react-native';
import api from '../common/Api';
import {sortByDate} from '../common/Util';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const settings = await messaging().requestPermission();

  if (settings) {
    //console.log('Permission settings:', settings);
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      //console.log(fcmToken);
      api.post('/saveUser', {notificationToken: fcmToken});
    }
  }
}

// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });
// messaging().onMessage(async (remoteMessage) => {
//   console.log('message received');
//   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
// });

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
    await requestUserPermission();
  };

  fetchMyDiets = async () => {
    const {navigate} = this.props.navigation;
    //console.log('fetching user diets');
    const response = await api.get('/userDiets');
    if (response.isUserLoggedIn !== undefined && !response.isUserLoggedIn) {
      //console.log('User not logged in - navigating to login page.');
      navigate('Login');
    } else {
      const {uid} = await api.get('/getLoggedInUser');
      //('uid: ', uid);
      let {diets} = response;
      diets = sortByDate(diets, 'createdDate');
      //console.log('user diets are ', diets);
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
      //console.log('diet: ', diet);
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
          <React.Fragment>
            <View style={styles.contactUsAnimationContainer}>
              <LottieView
                resizeMode="contain"
                source={require('../../assets/jsons/diet_list_animation_2.json')}
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
            <View style={styles.textViewContainer}>
              <Text style={styles.textStyle}>Loading...</Text>
            </View>
          </React.Fragment>
        ) : hasDiets ? (
          <View style={styles.container}>
            <View style={styles.buttonHeaderContainer}>
              <View style={styles.buttonContainer} />
            </View>

            <View style={styles.subHeaderContainer}>
              <TouchableOpacity
                style={styles.activeSubHeaderComponents}
                onPress={() => this.setState({currentDietOption: 'myDiets'})}>
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
          <React.Fragment>
            <View>
              <Text style={styles.createNewMessageTitle}>Get started</Text>
              <Text style={styles.createNewMessageTitle}>by clicking on</Text>
              <Text style={styles.createNewMessageTitle}>the + icon below</Text>
            </View>
            <View style={styles.addDietAnimationContainer}>
              <LottieView
                resizeMode="contain"
                source={require('../../assets/jsons/add_diet_animation.json')}
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}
