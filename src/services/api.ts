import axios, { AxiosError, AxiosInstance } from 'axios'

import { AppError } from '@utils/AppError'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/authToken/storageAuthToken'
import { AuthTokenDTO } from '@dtos/AuthTokenDTO'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIinstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.3:3333',
}) as APIinstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

// api.interceptors.request.use(
//   (config) => {
//     console.info('interceptor request', config)
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

api.registerInterceptTokenManager = (signOut: SignOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      console.info('interceptor response error', requestError)

      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === 'token.expired' ||
          requestError.response.data.message === 'token.invalid'
        ) {
          const storageTokenData = await storageAuthTokenGet()

          if (!storageTokenData?.refreshToken) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError?.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization = `Bearer ${token}`

                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          try {
            const { data } = await api.post<AuthTokenDTO>(
              '/sessions/refresh-token',
              {
                refresh_token: storageTokenData.refreshToken,
              },
            )

            const { refresh_token: refreshToken, token: newToken } = data

            await storageAuthTokenSave({
              token: newToken,
              refreshToken,
            })

            api.defaults.headers.common.Authorization = `Bearer ${newToken}`

            failedQueue.forEach((req) => req.onSuccess(newToken))
            failedQueue = []

            if (originalRequestConfig) {
              originalRequestConfig.headers.Authorization = `Bearer ${newToken}`
              return api(originalRequestConfig)
            }
          } catch (error) {
            failedQueue.forEach((promise) =>
              promise.onFailure(error as AxiosError),
            )
            failedQueue = []
            signOut()
          } finally {
            isRefreshing = false
          }
        }

        signOut()
      }

      if (axios.isAxiosError(requestError)) {
        if (requestError.response && requestError.response.data) {
          console.info('interceptor response error', requestError.response.data)

          return Promise.reject(
            new AppError(requestError.response.data.message),
          )
        }
      }

      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
