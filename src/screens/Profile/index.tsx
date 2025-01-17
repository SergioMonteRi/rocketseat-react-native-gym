import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'

import { api } from '@services/api'

import { useAuth } from '@hooks/useAuth'
import { useProfile } from '@hooks/useProfile'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'

import { profileSchema } from './formSchema'

import { ProfileFormData } from './types'

import defaultUserPhoto from '@assets/userPhotoDefault.png'

export const Profile = () => {
  const { user } = useAuth()
  const { isProfileDataUpdating, updateUserPhoto, updateUserProfileData } =
    useProfile()

  const { avatar } = user

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name,
    },
    resolver: yupResolver(profileSchema),
  })

  const handleProfileUpdate = async (data: ProfileFormData) => {
    await updateUserProfileData(data)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title={'Perfil'} />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={'$6'} px={'$10'}>
          <UserPhoto
            size={'xl'}
            alt={'Foto de perfil'}
            source={
              avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${avatar}` }
                : defaultUserPhoto
            }
          />

          <TouchableOpacity onPress={updateUserPhoto}>
            <Text
              mt={'$2'}
              mb={'$8'}
              fontSize={'$md'}
              color={'$green500'}
              fontFamily={'$heading'}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w={'$full'} gap={'$4'}>
            <Controller
              control={control}
              name={'name'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  bg={'$gray600'}
                  placeholder={'Nome'}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Input
              value={user.email}
              bg={'$gray600'}
              placeholder={'E-mail'}
              isReadOnly
            />
          </Center>

          <Heading
            mb={'$2'}
            mt={'$12'}
            fontSize={'$md'}
            color={'$gray200'}
            fontFamily={'$heading'}
            alignSelf={'flex-start'}
          >
            Alterar senha
          </Heading>

          <Center w={'$full'} gap={'$4'}>
            <Controller
              control={control}
              name={'old_password'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  bg={'$gray600'}
                  onChangeText={onChange}
                  placeholder={'Senha antiga'}
                  errorMessage={errors.old_password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name={'password'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  bg={'$gray600'}
                  onChangeText={onChange}
                  placeholder={'Nova senha'}
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
                  bg={'$gray600'}
                  onChangeText={onChange}
                  placeholder={'Confirmar nova senha'}
                  errorMessage={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            <Button
              mt={'$2'}
              title={'Atualizar'}
              isLoading={isProfileDataUpdating}
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
