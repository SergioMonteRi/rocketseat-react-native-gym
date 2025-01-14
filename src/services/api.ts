import axios from 'axios'

import { AppError } from '@utils/AppError'

const api = axios.create({
  baseURL: 'http://192.168.0.3:3333',
})

// api.interceptors.request.use(
//   (config) => {
//     console.info('interceptor request', config.data)
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

api.interceptors.response.use(
  (response) => {
    // console.info('interceptor response', response)

    return response
  },
  (error) => {
    console.info('interceptor response error', error)

    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
      }
    }

    return Promise.reject(error)
  },
)

export { api }
