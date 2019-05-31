import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import StartUpScreen from "./../startupscreen/StartUpScreen";
import LoginScreen from "./../login/LoginScreen1";
import ForgotPasswordScreen from "./../login/ForgotPasswordScreen";
import Supplements from "./../supplements/Supplements";
import Profile from "./../profile/Profile";
import EditProfile from "./../profile/EditProfile";
import EditProfileSubScreen1 from "./../profile/EditProfileSubScreen1";
import EditProfileSubScreen2 from "./../profile/EditProfileSubScreen2";
import MyDiet from "./../diet/MyDiet";
import Diet from "./../diet/Diet";
import SignUpScreen1 from "../signup/SignUpScreen1";
import SignUpScreen2 from "../signup/SignUpScreen2";
import SignUpScreen3 from "../signup/SignUpScreen3";
import Signup from "../signup/Signup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesNavTheme";
import { ICON_SIZE_NAV } from "../../assets/style/stylesCommonValues";
import AddButton from "./AddButton";

const LoginStackNavigator = createStackNavigator(
  {
    LoginScreen,
    ForgotPasswordScreen
  },
  {
    initialRouteName: "LoginScreen",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const SignUpStackNavigator = createStackNavigator(
  {
    Signup,
    SignUpScreen1,
    SignUpScreen2,
    SignUpScreen3
  },
  {
    initialRouteName: "Signup",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    Profile,
    EditProfile,
    EditProfileSubScreen1,
    EditProfileSubScreen2
  },
  {
    initialRouteName: "Profile",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const DietStackNavigator = createStackNavigator(
  {
    Diet: {
      screen: Diet
    },
    MyDiet: {
      screen: MyDiet
    }
  },
  {
    initialRouteName: "Diet",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Diet: {
      screen: DietStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="nutrition"
              size={ICON_SIZE_NAV}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical
              }}
            />
          );
        }
      }
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
        tabBarIcon: <AddButton /> // Plus button component
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="account"
              size={ICON_SIZE_NAV}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical
              }}
            />
          );
        }
      }
    }
  },
  {
    initialRouteName: "Diet",
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: styles.activeTintColor.color,
        inactiveTintColor: styles.bottomNavBar.tintColor,
        labelStyle: styles.labelStyle,
        style: {
          backgroundColor: styles.bottomNavBar.backgroundColor,
          borderTopWidth: 1,
          borderTopColor: styles.bottomNavBar.backgroundColor
        }
      }
    }
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeBottomTab: AppBottomTabNavigator
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    StartUp: StartUpScreen,
    Login: LoginStackNavigator,
    SignUp: SignUpStackNavigator,
    HomeScreen: HomeStackNavigator
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export const AppContainer = createAppContainer(AppSwitchNavigator);
