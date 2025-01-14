/* eslint-disable camelcase */
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { config } from './config/gluestack-ui.config'

import { Routes } from '@routes/index'

import { Loading } from '@components/Loading'

import { AuthContexProvider } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <AuthContexProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContexProvider>
    </GluestackUIProvider>
  )
}
