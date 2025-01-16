/* eslint-disable camelcase */
import { api } from './api'

import { UserProfileUpdateDTO } from '@dtos/UserDTO'

export const fetchProfileUpdate = async (
  userProfileUpdateData: UserProfileUpdateDTO,
) => {
  await api.put('/users', userProfileUpdateData)
}
