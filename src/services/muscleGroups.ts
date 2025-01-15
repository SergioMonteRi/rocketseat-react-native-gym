import { api } from './api'

export const fetchMuscleGroups = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/groups')

  return data
}
