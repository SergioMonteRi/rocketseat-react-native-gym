import { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, VStack, useToast } from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'

export const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<string>(
    'https://github.com/sergiomonteri.png',
  )

  const toast = useToast()

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
            <Input placeholder={'Nome'} bg={'$gray600'} />
            <Input
              bg={'$gray600'}
              value={'sergioribeiropalermo@gmail.com'}
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
            <Input
              bg={'$gray600'}
              placeholder={'Senha antiga'}
              secureTextEntry
            />
            <Input bg={'$gray600'} placeholder={'Nova senha'} secureTextEntry />
            <Input
              bg={'$gray600'}
              placeholder={'Confirmar nova senha'}
              secureTextEntry
            />

            <Button title={'Atualizar'} mt={'$2'} />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
