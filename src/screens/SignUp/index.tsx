import { useNavigation } from '@react-navigation/native'

import {
  Text,
  Image,
  VStack,
  Center,
  Heading,
  ScrollView,
  Box,
} from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import Logo from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export const SignUp = () => {
  const navigator = useNavigation()

  const handleBackNavigation = () => {
    navigator.goBack()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1}>
        <Image
          w={'$full'}
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt={'People working out'}
          position={'absolute'}
        />

        <VStack flex={1} p={'$10'} pb={'$16'}>
          <Center my={'$24'}>
            <Logo />
            <Text color={'$gray100'} fontSize={'$sm'}>
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Box gap={'$2'} flex={1}>
            <Heading color={'$gray100'} textAlign={'center'}>
              Crie sua conta
            </Heading>

            <Input
              placeholder="Email"
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />

            <Input placeholder={'Nome'} />

            <Input placeholder={'Senha'} secureTextEntry />

            <Button title={'Criar e acessar'} />
          </Box>

          <Button
            mt={'$12'}
            variant={'outline'}
            title={'Voltar para login'}
            onPress={handleBackNavigation}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
