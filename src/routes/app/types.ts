import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type AppRoutesProps = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: {
    exerciseId: number
  }
}

export type AppNavigationRouteProps = BottomTabNavigationProp<AppRoutesProps>
