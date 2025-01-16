import { useCallback, useState } from 'react'

import { useAuth } from '@hooks/useAuth'
import { useCustomToast } from '@hooks/useCustomToast'

import { UserProfileUpdateDTO } from '@dtos/UserDTO'

import { fetchProfileUpdate } from '@services/profile'

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

  return {
    isProfileDataUpdating,
    updateUserProfileData,
  }
}
