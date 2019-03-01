import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import LoginScreen from './../login/LoginScreen1'
import Home from './../home/Home'
import Diet from './../diet/Diet'
import Workouts from './../workouts/Workouts'
import Profile from './../profile/Profile'

const AppBottomTabNavigator = createBottomTabNavigator({
  Home,
  Diet,
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
    }
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen,
  HomeScreen: HomeStackNavigator
})

export const AppContainer = createAppContainer(AppSwitchNavigator)
