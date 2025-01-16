import { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, VStack, useToast } from '@gluestack-ui/themed'

import { useAuth } from '@hooks/useAuth'
import { useProfile } from '@hooks/useProfile'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'

import { profileSchema } from './formSchema'

import { ProfileFormData } from './types'

export const Profile = () => {
  const toast = useToast()
  const { user } = useAuth()
  const { isProfileDataUpdating, updateUserProfileData } = useProfile()

  const [userPhoto, setUserPhoto] = useState<string>(
    'https://github.com/sergiomonteri.png',
  )

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

  const handleUserPhotoSelect = async () => {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        mediaTypes: ['images'],
      })

      if (selectedPhoto.canceled) {
        return
      }

      const photoURI = selectedPhoto.assets[0].uri

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                type={'error'}
                title={'Erro ao selecionar a foto'}
                description={
                  'A imagem selecionada é muito grande. Por favor, selecione uma imagem com até 5MB.'
                }
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserPhoto(photoURI)
      }
    } catch (error) {
      console.error('Erro ao selecionar a foto', error)
    }
  }

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
            source={{ uri: userPhoto }}
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
