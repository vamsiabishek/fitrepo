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
import SignUp from "../signup/SignUp";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesNavTheme";

const DietStackNavigator = createStackNavigator(
  {
    CreateDiet: {
      screen: CreateDiet,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: (
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => navigation.goBack()}
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
                Back
              </Text>
            </TouchableOpacity>
          )
        };
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
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <TouchableOpacity
              style={{ flexDirection: "row", marginRight: 10 }}
              onPress={() => navigation.navigate("CreateDiet")}
            >
              <Text
                style={{
                  color: styles.headerTextStyle.color,
                  fontSize: styles.headerTextStyle.fontSize
                }}
              >
                Create New
              </Text>
              <Icon
                name="pencil-box"
                size={20}
                color={styles.headerTIcolor.color}
                solid
              />
            </TouchableOpacity>
          ),
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle
        };
      }
    }
  },
  { initialRouteName: "Diet" }
);

const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
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
        },
        tabBarOptions: {
          activeTintColor: styles.activeTintColor.color,
          inactiveTintColor: styles.bottomNavBar.color,
          labelStyle: styles.labelStyle,
          style: {
            backgroundColor: styles.bottomNavBar.backgroundColor
          }
        }
      })
    },
    Diet: {
      screen: DietStackNavigator,
      navigationOptions: () => ({
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
        },
        tabBarOptions: {
          activeTintColor: styles.activeTintColor.color,
          inactiveTintColor: styles.bottomNavBar.color,
          labelStyle: styles.labelStyle,
          style: {
            backgroundColor: styles.bottomNavBar.backgroundColor
          }
        }
      })
    },
    Workouts: {
      screen: Workouts,
      navigationOptions: () => ({
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
        },
        tabBarOptions: {
          activeTintColor: styles.activeTintColor.color,
          inactiveTintColor: styles.bottomNavBar.color,
          labelStyle: styles.labelStyle,
          style: {
            backgroundColor: styles.bottomNavBar.backgroundColor
          }
        }
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
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
        },
        tabBarOptions: {
          activeTintColor: styles.activeTintColor.color,
          inactiveTintColor: styles.bottomNavBar.color,
          labelStyle: styles.labelStyle,
          style: {
            backgroundColor: styles.bottomNavBar.backgroundColor
          }
        }
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeBottomTab: AppBottomTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
      };
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen,
  SignUp,
  HomeScreen: HomeStackNavigator
});

export const AppContainer = createAppContainer(AppSwitchNavigator);
