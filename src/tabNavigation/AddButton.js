import React from 'react';
import {TouchableHighlight, View, Alert} from 'react-native';
import {throttle} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import {styleCommon, fontsCommon} from '../../assets/style/stylesCommonValues';
import {sortByDate} from '../common/Util';
import Loading from '../components/Loading';
import api from '../common/Api';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.addNewHandler = throttle(this.addNew, 1000, {
      leading: true, // default
      trailing: true, // default
    });
  }
  addNew = async () => {
    this.setState({isLoading: true});
    let {diets} = await api.get('/userDiets');
    diets = sortByDate(diets, 'createdDate');
    const latestDiet = diets[0];
    this.setState({isLoading: false});
    if (latestDiet !== undefined) {
      const {createdDate, selectedProgram} = latestDiet;
      const fromDate = createdDate ? new Date(createdDate) : new Date();
      const diffInMilliSecs = new Date().getTime() - fromDate.getTime();
      const total_seconds = parseInt(Math.floor(diffInMilliSecs / 1000), 10);
      const total_minutes = parseInt(Math.floor(total_seconds / 60), 10);
      const total_hours = parseInt(Math.floor(total_minutes / 60), 10);
      const days = parseInt(Math.floor(total_hours / 24), 10);
      if (days <= selectedProgram * 7) {
        Alert.alert(
          'Are you sure ?',
          `You are curently active on the ${selectedProgram} Week diet program, are you sure about creating a new program?`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Continue', onPress: () => this.navigateToCreateDiet()},
          ],
          {cancelable: false},
        );
      } else {
        this.navigateToCreateDiet();
      }
    } else {
      this.navigateToCreateDiet();
    }
  };
  navigateToCreateDiet = (uid) => {
    const {navigation} = this.props;
    navigation.navigate('Signup', {
      fromAddNew: true,
    });
  };
  render() {
    const SIZE = fontsCommon.font80;
    const {isLoading} = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
        }}>
        {isLoading ? (
          <Loading
            isTextNotAvailable
            animationStr={require('../../assets/jsons/user_animation_4.json')}
          />
        ) : (
          <TouchableHighlight
            onPress={this.addNewHandler}
            underlayColor="#2882D8"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: '#FA8072',
            }}>
            <Icon
              name="plus"
              size={fontsCommon.font28}
              color={styleCommon.textColor1}
            />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(AddButton);
