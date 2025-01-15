import { useCallback, useState } from 'react'

import { useCustomToast } from '@hooks/useCustomToast'

import { fetchMuscleGroups } from '@services/muscleGroups'

export const useMuscleGroups = () => {
  const { showToast } = useCustomToast()
  const [muscleGroups, setMuscleGroups] = useState<string[]>([])

  const [isLoadingMuscleGroups, setIsLoadingMuscleGroups] = useState(false)

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

  return {
    muscleGroups,
    isLoadingMuscleGroups,
    loadMuscleGroups,
  }
}
