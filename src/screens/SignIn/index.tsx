import {
  Image,
  VStack,
  Center,
  Text,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import Logo from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export const SignIn = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1} bg={'$gray700'}>
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

          <Center gap={'$2'}>
            <Heading color={'$gray100'}>Acesse a conta</Heading>

            <Input
              placeholder="Email"
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button title={'Acessar'} />
          </Center>

          <Center flex={1} justifyContent={'flex-end'} mt={'$4'}>
            <Text
              mb={'$3'}
              fontSize={'$sm'}
              color={'$gray100'}
              fontFamily={'$body'}
            >
              Ainda não tem acesso?
            </Text>

            <Button title={'Criar conta'} variant={'outline'} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
