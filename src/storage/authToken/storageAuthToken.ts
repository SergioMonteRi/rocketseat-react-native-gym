import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_AUTH_TOKEN } from '@storage/storageConfig'

export const storageAuthTokenSave = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_AUTH_TOKEN, token)
  } catch (error) {
    console.log('storageAuthTokenSave', error)
  }
}

export const storageAuthTokenGet = async () => {
  try {
    const storageData = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN)

    return storageData
  } catch (error) {
    console.log('storageAuthTokenGet', error)
  }
}

export const storageAuthTokenRemove = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_AUTH_TOKEN)
  } catch (error) {
    console.log('storageAuthTokenRemove', error)
  }
}
