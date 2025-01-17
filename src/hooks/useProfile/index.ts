import { useCallback, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

import { useAuth } from '@hooks/useAuth'
import { useCustomToast } from '@hooks/useCustomToast'

import { UserProfileUpdateDTO } from '@dtos/UserDTO'

import { fetchProfileUpdate, fetchProfileUpdatePhoto } from '@services/profile'

export const useProfile = () => {
  const { showToast } = useCustomToast()
  const { user, updateUserData } = useAuth()

  const [isProfileDataUpdating, setIsProfileDataUpdating] = useState(false)

  const updateUserProfileData = useCallback(
    async (userProfileUpdateData: UserProfileUpdateDTO) => {
      setIsProfileDataUpdating(true)

      try {
        await fetchProfileUpdate(userProfileUpdateData)

        const userUpdated = user
        userUpdated.name = userProfileUpdateData.name

        await updateUserData(userUpdated)

        showToast({
          type: 'success',
          alternativeMessage: 'Dados de perfil atualizados com sucesso!',
        })
      } catch (error) {
        showToast({
          error,
          type: 'error',
          alternativeMessage:
            'Não foi possível atualizar seus dados de perfil.',
        })
      } finally {
        setIsProfileDataUpdating(false)
      }
    },
    [showToast, updateUserData, user],
  )

  const updateUserPhoto = useCallback(async () => {
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
          return showToast({
            type: 'error',
            alternativeMessage:
              'A imagem selecionada é muito grande. Por favor, selecione uma imagem com até 5MB.',
          })
        }

        const photoExtension = photoURI.split('.').pop()
        const photoType = selectedPhoto.assets[0].type

        const photoFile = {
          uri: photoURI,
          type: `${photoType}/${photoExtension}`,
          name: `${user.name}.${photoExtension}`
            .toLowerCase()
            .replace(/\s/g, ''),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const avatarUpdatedResponse =
          await fetchProfileUpdatePhoto(userPhotoUploadForm)

        const updatedUpser = user
        user.avatar = avatarUpdatedResponse.avatar

        await updateUserData(updatedUpser)

        showToast({
          type: 'success',
          alternativeMessage: 'Foto de perfil atualizada com sucesso!',
        })
      }
    } catch (error) {
      showToast({
        error,
        type: 'error',
        alternativeMessage: 'Não foi possível atualizar sua foto de perfil.',
      })
    }
  }, [showToast, updateUserData, user])

  return {
    isProfileDataUpdating,
    updateUserPhoto,
    updateUserProfileData,
  }
}
