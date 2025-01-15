import { useCallback, useState } from 'react'

import { useCustomToast } from '@hooks/useCustomToast'

import { fecthExerciseByGroup, fetchMuscleGroups } from '@services/muscleGroups'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

export const useMuscleGroups = () => {
  const { showToast } = useCustomToast()
  const [muscleGroups, setMuscleGroups] = useState<string[]>([])
  const [exerciseByGroup, setExerciseByGroup] = useState<ExerciseDTO[]>([])

  const [isLoadingMuscleGroups, setIsLoadingMuscleGroups] = useState(false)
  const [isLoadingExercisesByGroup, setIsLoadingExercisesByGroup] =
    useState(false)

  const loadMuscleGroups = useCallback(async () => {
    setIsLoadingMuscleGroups(true)

    try {
      const muscleGroups = await fetchMuscleGroups()
      setMuscleGroups(muscleGroups)
    } catch (error) {
      showToast({
        error,
        type: 'error',
        alternativeMessage: 'Não foi possível carregar os grupos musculares',
      })
    } finally {
      setIsLoadingMuscleGroups(false)
    }
  }, [showToast])

  const loadExercisesByGroup = useCallback(
    async (muscleGroup: string) => {
      setIsLoadingExercisesByGroup(true)

      try {
        const exerciseByGroup = await fecthExerciseByGroup(muscleGroup)
        setExerciseByGroup(exerciseByGroup)
      } catch (error) {
        showToast({
          error,
          type: 'error',
          alternativeMessage: 'Não foi possível carregar os exercícios.',
        })
      } finally {
        setIsLoadingExercisesByGroup(false)
      }
    },
    [showToast],
  )

  return {
    muscleGroups,
    exerciseByGroup,
    isLoadingMuscleGroups,
    isLoadingExercisesByGroup,
    loadMuscleGroups,
    loadExercisesByGroup,
  }
}
