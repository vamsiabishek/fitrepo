import React from "react";
import { Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import LoginScreen from './../login/LoginScreen1'
import Home from './../home/Home'
import CreateDiet from '../diet/CreateDiet'
import Workouts from './../workouts/Workouts'
import Profile from './../profile/Profile'
import MyDiet from  './../diet/MyDiet'
import Diet from  './../diet/Diet'

const DietStackNavigator = createStackNavigator({
  CreateDiet: {
    screen: CreateDiet,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'Create New Diet'
      }
    }
  },
  MyDiet: {
    screen: MyDiet,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'My Diet',
        headerLeft: 
        <TouchableOpacity style={{flexDirection: 'row', marginLeft:10}}
        onPress={()=>navigation.navigate('Diet')}>
          <Icon name="angle-left" size={30} color="#3498DB" />
          <Text style={{color:"#3498DB", fontSize:18, marginTop:4, marginLeft:2}}>All Diets</Text>
        </TouchableOpacity> ,
      }
    }
  },
  Diet: {
    screen: Diet,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'Diet',
        headerRight: 
        <TouchableOpacity style={{flexDirection: 'row', marginRight:10}}
        onPress={()=>navigation.navigate('CreateDiet')}>
          <Text style={{color:"#3498DB", fontSize:16, marginRight:3}}>Create New</Text>
          <Icon name="edit" size={18} color="#3498DB" solid />
        </TouchableOpacity>
      }
    }
  }
}, { initialRouteName: 'Diet' })

const AppBottomTabNavigator = createBottomTabNavigator({
  Home,
  Diet: DietStackNavigator,
  Workouts,
  Profile,
},{
  tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'teal',
    },
  }
})

const HomeStackNavigator = createStackNavigator({
  HomeBottomTab: AppBottomTabNavigator
},{
  defaultNavigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName,
      headerStyle: {
        backgroundColor: 'teal'
      },
      header: null,
    }
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen,
  HomeScreen: HomeStackNavigator
})

export const AppContainer = createAppContainer(AppSwitchNavigator)
