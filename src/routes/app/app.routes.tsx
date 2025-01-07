import { Platform } from 'react-native'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { History } from '@screens/History'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'

import { AppRoutesIcons } from '@constants/appRoutesIcons'

import { AppRoutesProps } from './types'

import { gluestackUIConfig } from '../../../config/gluestack-ui.config'

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export const AppRoutes = () => {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space['6']

  return (
    <Navigator
      tabBar={(props) => {
        const filteredRoutes = props.state.routes.filter(
          (route) => route.name !== 'exercise',
        )

        return (
          <BottomTabBar
            {...props}
            state={{ ...props.state, routes: filteredRoutes }}
          />
        )
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray300,
        tabBarStyle: {
          paddingTop: tokens.space['3'],
          backgroundColor: tokens.colors.gray600,
          height: Platform.OS === 'android' ? 72 : 96,
          paddingBottom: Platform.OS === 'android' ? 12 : 32,
          display: 'flex',
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AppRoutesIcons.home
              fill={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <AppRoutesIcons.history
              fill={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AppRoutesIcons.profile
              fill={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  )
}
