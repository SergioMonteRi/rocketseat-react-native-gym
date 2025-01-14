import { useContext } from 'react'

import { AuthContext } from '@contexts/AuthContext'

export const useAuth = () => {
  const contex = useContext(AuthContext)

  return contex
}
