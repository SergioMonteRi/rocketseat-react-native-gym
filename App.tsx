/* eslint-disable camelcase */
import { StatusBar, View } from 'react-native'

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'

import { GluestackUIProvider, Text } from '@gluestack-ui/themed'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })

  return (
    <GluestackUIProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#202020',
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent
        />

        {fontsLoaded ? (
          <Text color="white" fontSize={34}>
            Home
          </Text>
        ) : (
          <View />
        )}
      </View>
    </GluestackUIProvider>
  )
}
