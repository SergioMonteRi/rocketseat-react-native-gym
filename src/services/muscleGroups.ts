import { api } from './api'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

export const fetchMuscleGroups = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/groups')

  return data
}

export const fecthExerciseByGroup = async (
  muscleGroup: string,
): Promise<ExerciseDTO[]> => {
  const { data } = await api.get<ExerciseDTO[]>(
    `/exercises/bygroup/${muscleGroup}`,
  )

  return data
}
