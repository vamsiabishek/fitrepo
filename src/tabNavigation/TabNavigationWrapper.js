import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import StartUpScreen from './../startupscreen/StartUpScreen';
import LoginScreen from '../login/LoginScreen';
import ForgotPasswordScreen from './../login/ForgotPasswordScreen';
import Supplements from './../supplements/Supplements';
import Profile from './../profile/Profile';
import EditProfile from './../profile/EditProfile';
import EditProfileSubScreen1 from './../profile/EditProfileSubScreen1';
import MyDiet from './../diet/MyDiet';
import Diet from './../diet/Diet';
import Signup from '../signup/Signup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../assets/style/stylesNavTheme';
import {ICON_SIZE_NAV} from '../../assets/style/stylesCommonValues';
import AddButton from './AddButton';

const LoginStackNavigator = createStackNavigator(
  {
    LoginScreen,
    ForgotPasswordScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const SignUpStackNavigator = createStackNavigator(
  {
    Signup,
  },
  {
    initialRouteName: 'Signup',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const ProfileStackNavigator = createStackNavigator(
  {
    Profile,
    EditProfile,
    EditProfileSubScreen1,
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const DietStackNavigator = createStackNavigator(
  {
    Diet: {
      screen: Diet,
    },
    MyDiet: {
      screen: MyDiet,
    },
  },
  {
    initialRouteName: 'Diet',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Diet: {
      screen: DietStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="nutrition"
              size={ICON_SIZE_NAV}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical,
              }}
            />
          );
        },
      },
    },
    Supplements: {
      screen: Supplements,
      navigationOptions: {
        /* tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="medical-bag" //"dumbbell"
              size={ICON_SIZE_NAV}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical
              }}
            />
          );
        } */
        tabBarLabel: () => {},
        tabBarIcon: <AddButton />, // Plus button component
        tabBarOnPress: () => {}, // double clicking on add button was opening the supplements screen
      },
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="account"
              size={ICON_SIZE_NAV}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical,
              }}
            />
          );
        },
      },
    },
  },
  {
    initialRouteName: 'Diet',
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: styles.activeTintColor.color,
        inactiveTintColor: styles.bottomNavBar.tintColor,
        labelStyle: styles.labelStyle,
        style: {
          backgroundColor: styles.bottomNavBar.backgroundColor,
          borderTopWidth: 1,
          borderTopColor: styles.bottomNavBar.backgroundColor,
        },
      },
    },
  },
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeBottomTab: AppBottomTabNavigator,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    StartUp: StartUpScreen,
    Login: LoginStackNavigator,
    SignUp: SignUpStackNavigator,
    HomeScreen: HomeStackNavigator,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export const AppContainer = createAppContainer(AppSwitchNavigator);
