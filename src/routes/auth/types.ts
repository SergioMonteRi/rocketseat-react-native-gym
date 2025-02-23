import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AuthRoutesProps = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigationRouteProps =
  NativeStackNavigationProp<AuthRoutesProps>
