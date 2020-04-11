import React from 'react';
import {TouchableHighlight, View, Alert} from 'react-native';
import {database} from '../common/FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import {createKeyAndValuesFromResult} from '../common/Util';
import {styleCommon, fontsCommon} from '../../assets/style/stylesCommonValues';
import {getCurrentUser} from '../common/Util';
import Loading from '../components/Loading';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  addNew = async () => {
    this.setState({isLoading: true});
    const {uid} = await getCurrentUser();
    let latestDiet = {};
    await database
      .ref(`diets/${uid}`)
      .orderByChild('createdDate')
      .limitToLast(1)
      .once('value')
      .then((snap) => {
        const results = snap.val();
        latestDiet = createKeyAndValuesFromResult(results)[0];
        this.setState({isLoading: false});
      })
      .catch((error) => {
        latestDiet = undefined;
        console.log(error);
      });
    if (latestDiet !== undefined) {
      const {createdDate, selectedProgram} = latestDiet.value;
      const fromDate = new Date(createdDate);
      const diffInMilliSecs = new Date().getTime() - fromDate.getTime();
      const total_seconds = parseInt(Math.floor(diffInMilliSecs / 1000), 10);
      const total_minutes = parseInt(Math.floor(total_seconds / 60), 10);
      const total_hours = parseInt(Math.floor(total_minutes / 60), 10);
      const days = parseInt(Math.floor(total_hours / 24), 10);
      if (days <= selectedProgram * 7) {
        Alert.alert(
          'Create diet confirmation !',
          `You are curently active on ${selectedProgram} Week diet, are you sure about creating new diet ?`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Continue', onPress: () => this.navigateToCreateDiet(uid)},
          ],
          {cancelable: false},
        );
      } else {
        this.navigateToCreateDiet(uid);
      }
    } else {
      this.navigateToCreateDiet(uid);
    }
  };
  navigateToCreateDiet = (uid) => {
    const {navigation} = this.props;
    navigation.navigate('Signup', {
      isExistingUser: true,
      uid,
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
            onPress={() => this.addNew()}
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
