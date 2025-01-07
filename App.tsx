/* eslint-disable camelcase */
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { config } from './config/gluestack-ui.config'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index'

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

      {fontsLoaded ? <Routes /> : <Loading />}
    </GluestackUIProvider>
  )
}
