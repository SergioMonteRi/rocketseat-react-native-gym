import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
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

import { api } from '@services/api'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useAuth } from '@hooks/useAuth'
import { useCustomToast } from '@hooks/useCustomToast'

import { signUpSchema } from './formSchema'

import { SignUpFormData } from './types'

import Logo from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export const SignUp = () => {
  const { signIn } = useAuth()
  const navigator = useNavigation()
  const { showToast } = useCustomToast()

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  })

  const handleBackNavigation = () => {
    navigator.goBack()
  }

  const onSubmit = async ({ name, email, password }: SignUpFormData) => {
    try {
      setIsLoadingSubmit(true)

      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      showToast({
        error,
        type: 'error',
        alternativeMessage:
          'Não foi possível criar a conta. Tente novamente mais tarde',
      })
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1}>
        <Image
          h={624}
          w={'$full'}
          source={BackgroundImg}
          position={'absolute'}
          alt={'People working out'}
          defaultSource={BackgroundImg}
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

            <Controller
              control={control}
              name={'name'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder={'Nome'}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'email'}
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
              name={'password'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder={'Senha'}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name={'confirmPassword'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  returnKeyType={'send'}
                  onChangeText={onChange}
                  placeholder={'Confirmar senha'}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  errorMessage={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            <Button
              title={'Criar e acessar'}
              isLoading={isLoadingSubmit}
              onPress={handleSubmit(onSubmit)}
            />
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
