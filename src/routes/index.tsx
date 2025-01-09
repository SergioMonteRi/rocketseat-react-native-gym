import { Box } from '@gluestack-ui/themed'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

// import { AppRoutes } from './app/app.routes'
import { AuthRoutes } from './auth/auth.routes'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

export const Routes = () => {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  return (
    <Box flex={1} bg={'$gray700'}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
