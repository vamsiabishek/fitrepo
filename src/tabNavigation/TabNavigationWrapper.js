import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import LoginScreen from "./../login/LoginScreen1";
import Home from "./../home/Home";
import CreateDiet from "../diet/CreateDiet";
import Workouts from "./../workouts/Workouts";
import Profile from "./../profile/Profile";
import MyDiet from "./../diet/MyDiet";
import Diet from "./../diet/Diet";
import SignUpScreen1 from "../signup/SignUpScreen1";
import SignUpScreen2 from "../signup/SignUpScreen2";
import SignUpScreen3 from "../signup/SignUpScreen3";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesNavTheme";

const SignUpStackNavigator = createStackNavigator(
  {
    SignUpScreen1,
    SignUpScreen2,
    SignUpScreen3
  },
  {
    initialRouteName: "SignUpScreen1",
    defaultNavigationOptions: {
      header: null,
      headerStyle: styles.headerStyle
    }
  }
);

const DietStackNavigator = createStackNavigator(
  {
    CreateDiet: {
      screen: CreateDiet,
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
    },
    Diet: {
      screen: Diet,
      navigationOptions: {
        header: null
      }
    }
  },
  { initialRouteName: "Diet" }
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
              size={styles.iconSize}
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
              size={styles.iconSize}
              style={{
                color: tintColor,
                paddingVertical: styles.bottomNavBar.paddingVertical
              }}
            />
          );
        }
      }
    },
    Workouts: {
      screen: Workouts,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="dumbbell"
              size={styles.iconSize}
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
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="account"
              size={styles.iconSize}
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
    initialRouteName: "Home",
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: styles.activeTintColor.color,
        inactiveTintColor: styles.bottomNavBar.color,
        labelStyle: styles.labelStyle,
        navBarTransparent: true,
        style: {
          //backgroundColor: "transparent"
          backgroundColor: styles.bottomNavBar.backgroundColor
          //opacity: styles.bottomNavBar.opacity
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
    Login: LoginScreen,
    SignUp: SignUpStackNavigator,
    HomeScreen: HomeStackNavigator
  },
  {
    initialRouteName: "Login"
  }
);

export const AppContainer = createAppContainer(AppSwitchNavigator);
