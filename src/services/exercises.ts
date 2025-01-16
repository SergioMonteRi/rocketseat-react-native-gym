import { api } from './api'

import { ExerciseDTO, ExerciseHistoryDTO } from '@dtos/ExerciseDTO'

export const fetchExerciseById = async (
  exerciseId: number,
): Promise<ExerciseDTO> => {
  const { data } = await api.get<ExerciseDTO>(`/exercises/${exerciseId}`)

  return data
}

export const fetchExerciseByGroup = async (
  muscleGroup: string,
): Promise<ExerciseDTO[]> => {
  const { data } = await api.get<ExerciseDTO[]>(
    `/exercises/bygroup/${muscleGroup}`,
  )

  return data
}

export const fetchCompleteExercise = async (exerciseId: number) => {
  await api.post('/history', { exercise_id: exerciseId })
}

export const fetchExerciseHistory = async (): Promise<ExerciseHistoryDTO[]> => {
  const { data } = await api.get<ExerciseHistoryDTO[]>('/history')

  return data
}
