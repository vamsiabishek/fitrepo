import React from "react";
import { Text, TouchableOpacity, ImageBackground } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import StartUpScreen from "./../startupscreen/StartUpScreen";
import LoginScreen from "./../login/LoginScreen1";
import Home from "./../home/Home";
import CreateDiet from "../diet/CreateDiet";
import Workouts from "./../workouts/Workouts";
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
import NewDiet from "../diet/NewDiet";

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
      header: null,
      headerTransparent: true,
      headerStyle: styles.headerStyle
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
      header: null,
      headerStyle: styles.headerStyle
    }
  }
);

const DietStackNavigator = createStackNavigator(
  {
    Diet: {
      screen: Diet,
      navigationOptions: {
        header: null
      }
    },
    NewDiet: {
      screen: NewDiet,
      navigationOptions: {
        header: null
      }
    },
    MyDiet: {
      screen: MyDiet,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: (
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => navigation.navigate("Diet")}
            >
              <Icon
                name="arrow-left-thick"
                size={20}
                color={styles.headerTIcolor.color}
              />
              <Text
                style={{
                  color: styles.headerTextStyle.color,
                  fontSize: styles.headerTextStyle.fontSize
                }}
              >
                All Diets
              </Text>
            </TouchableOpacity>
          )
        };
      }
    }
  },
  { initialRouteName: "MyDiet" }
);

const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="home-variant"
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
        tabBarIcon: ({ tintColor }) => {
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
        }
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
    initialRouteName: "Supplements",
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
      header: null,
      headerStyle: styles.headerStyle
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    StartUp: StartUpScreen,
    Login: LoginScreen,
    SignUp: SignUpStackNavigator,
    HomeScreen: HomeStackNavigator
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export const AppContainer = createAppContainer(AppSwitchNavigator);
