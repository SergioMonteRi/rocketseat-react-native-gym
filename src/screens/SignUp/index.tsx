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

export const SignUp = () => {
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

          <Center flex={1} gap={'$2'}>
            <Heading color={'$gray100'}>Crie sua conta</Heading>

            <Input
              placeholder="Email"
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />

            <Input placeholder={'Nome'} />

            <Input placeholder={'Senha'} secureTextEntry />

            <Button title={'Criar e acessar'} />
          </Center>

          <Button title={'Voltar para login'} variant={'outline'} mt={'$12'} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
