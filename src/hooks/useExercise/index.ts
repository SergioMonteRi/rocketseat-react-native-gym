import { useCallback, useState } from 'react'

import { useCustomToast } from '@hooks/useCustomToast'

import {
  fetchExerciseById,
  fetchExerciseByGroup,
  fetchCompleteExercise,
} from '@services/exercises'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

export const useExercise = () => {
  const { showToast } = useCustomToast()

  const [exerciseByGroup, setExerciseByGroup] = useState<ExerciseDTO[]>([])
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDTO>(
    {} as ExerciseDTO,
  )

  const [isExerciseDetailsLoading, setIsExerciseDetailsLoading] =
    useState(false)
  const [isExercisesByGroupLoading, setIsExercisesByGroupLoading] =
    useState(false)
  const [isExerciseCompletionLoading, setIsExerciseCompletionLoading] =
    useState(false)

  const loadExerciseDetails = useCallback(
    async (exerciseId: number) => {
      setIsExerciseDetailsLoading(true)

      try {
        const response = await fetchExerciseById(exerciseId)

        setExerciseDetails(response)
      } catch (error) {
        showToast({
          error,
          type: 'error',
          alternativeMessage:
            'Não foi possível carregar os detalhes do exercício.',
        })
      } finally {
        setIsExerciseDetailsLoading(false)
      }
    },
    [showToast],
  )

  const loadExercisesByGroup = useCallback(
    async (muscleGroup: string) => {
      setIsExercisesByGroupLoading(true)

      try {
        const exerciseByGroup = await fetchExerciseByGroup(muscleGroup)
        setExerciseByGroup(exerciseByGroup)
      } catch (error) {
        showToast({
          error,
          type: 'error',
          alternativeMessage: 'Não foi possível carregar os exercícios.',
        })
      } finally {
        setIsExercisesByGroupLoading(false)
      }
    },
    [showToast],
  )

  const registerExerciseHistory = useCallback(
    async (exerciseId: number) => {
      setIsExerciseCompletionLoading(true)

      try {
        await fetchCompleteExercise(exerciseId)

        showToast({
          type: 'success',
          alternativeMessage: 'Parabéns! Exercício registrado como realizado.',
        })
      } catch (error) {
        showToast({
          error,
          type: 'error',
          alternativeMessage:
            'Não foi possível registrar o exercício como realizado.',
        })
      } finally {
        setIsExerciseCompletionLoading(false)
      }
    },
    [showToast],
  )

  return {
    exerciseByGroup,
    exerciseDetails,
    isExerciseDetailsLoading,
    isExercisesByGroupLoading,
    isExerciseCompletionLoading,
    loadExerciseDetails,
    loadExercisesByGroup,
    registerExerciseHistory,
  }
}
