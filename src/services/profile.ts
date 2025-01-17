/* eslint-disable camelcase */
import { api } from './api'

import { UserDTO, UserProfileUpdateDTO } from '@dtos/UserDTO'

export const fetchProfileUpdate = async (
  userProfileUpdateData: UserProfileUpdateDTO,
) => {
  await api.put('/users', userProfileUpdateData)
}

export const fetchProfileUpdatePhoto = async (
  userPhotoUploadForm: FormData,
): Promise<UserDTO> => {
  const { data } = await api.patch<UserDTO>(
    '/users/avatar',
    userPhotoUploadForm,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )

  return data
}
