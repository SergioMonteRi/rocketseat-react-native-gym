import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Text,
  Image,
  VStack,
  Center,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigationRouteProps } from '@routes/auth/types'

import { useAuth } from '@hooks/useAuth'
import { useCustomToast } from '@hooks/useCustomToast'

import Logo from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { signInSchema } from './formSchema'

import { SignInFormData } from './types'

export const SignIn = () => {
  const navigator = useNavigation<AuthNavigationRouteProps>()

  const { signIn } = useAuth()
  const { showToast } = useCustomToast()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  })

  const handleNewAccount = () => {
    navigator.navigate('signUp')
  }

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsSigningIn(true)
      await signIn(data.email, data.password)
    } catch (error) {
      showToast({
        error,
        type: 'error',
        alternativeMessage:
          'Não foi possível acessar a conta. Tente novamente mais tarde.',
      })
    } finally {
      setIsSigningIn(false)
    }
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

          <Box gap={'$2'}>
            <Heading color={'$gray100'} textAlign={'center'}>
              Acesse a conta
            </Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Email"
                  onChangeText={onChange}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Senha"
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title={'Acessar'}
              isLoading={isSigningIn}
              onPress={handleSubmit(onSubmit)}
            />
          </Box>

          <Center flex={1} justifyContent={'flex-end'} mt={'$4'}>
            <Text
              mb={'$3'}
              fontSize={'$sm'}
              color={'$gray100'}
              fontFamily={'$body'}
            >
              Ainda não tem acesso?
            </Text>

            <Button
              variant={'outline'}
              title={'Criar conta'}
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
