import { createContext, useCallback, useEffect, useState } from 'react'

import { api } from '@services/api'

import { UserDTO } from '@dtos/UserDTO'
import { SignInDTO } from '@dtos/SignInDTO'

import {
  storageUserGet,
  storageUserSave,
  storageUserRemove,
} from '@storage/user/storageUser'

import {
  storageAuthTokenGet,
  storageAuthTokenSave,
  storageAuthTokenRemove,
} from '@storage/authToken/storageAuthToken'

import { AuthContextDataProps, AuthContextProviderProps } from './types'

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const AuthContexProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const userAndTokenUpdate = useCallback((userData: UserDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }, [])

  const storageUserAndTokenSave = useCallback(
    async (userData: UserDTO, token: string, refreshToken: string) => {
      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refreshToken })
    },
    [],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data } = await api.post<SignInDTO>('/sessions', {
        email,
        password,
      })

      if (data?.user && data?.token && data?.refresh_token) {
        // eslint-disable-next-line camelcase
        const { user: userData, token, refresh_token } = data

        await storageUserAndTokenSave(userData, token, refresh_token)
        userAndTokenUpdate(userData, token)
      }
    },
    [storageUserAndTokenSave, userAndTokenUpdate],
  )

  const loadUserData = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)

      const userData = await storageUserGet()
      const authToken = await storageAuthTokenGet()

      if (userData && authToken) {
        userAndTokenUpdate(userData, authToken.token)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [userAndTokenUpdate])

  const singOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserRemove()
      await storageAuthTokenRemove()

      setUser({} as UserDTO)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  const updateUserData = useCallback(async (userUpdatedData: UserDTO) => {
    setUser(userUpdatedData)
    await storageUserSave(userUpdatedData)
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(singOut)

    return () => subscribe()
  }, [singOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        singOut,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
