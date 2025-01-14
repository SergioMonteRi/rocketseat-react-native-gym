import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserDTO } from '@dtos/UserDTO'

import { STORAGE_USER_DATA } from '@storage/storageConfig'

export const storageUserSave = async (user: UserDTO) => {
  try {
    await AsyncStorage.setItem(STORAGE_USER_DATA, JSON.stringify(user))
  } catch (error) {
    console.log('storageUserSave', error)
  }
}

export const storageUserGet = async () => {
  try {
    const storageData = await AsyncStorage.getItem(STORAGE_USER_DATA)

    const user: UserDTO = storageData ? JSON.parse(storageData) : null

    return user
  } catch (error) {
    console.log(error)
  }
}

export const storageUserRemove = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_USER_DATA)
  } catch (error) {
    console.log(error)
  }
}
