import { FlatList } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { AppNavigationRouteProps } from '@routes/app/types'

import { useExercise } from '@hooks/useExercise'
import { useMuscleGroups } from '@hooks/useMuscleGroups'

import { HomeHeader } from '@components/HomeHeader'
import { MuscleGroup } from '@components/MuscleGroup'
import { ExerciseCard } from '@components/ExerciseCard'

export const Home = () => {
  const navigation = useNavigation<AppNavigationRouteProps>()

  const { muscleGroups, loadMuscleGroups } = useMuscleGroups()
  const { exerciseByGroup, loadExercisesByGroup } = useExercise()

  const [groupSelected, setGroupSelected] = useState('antebraço')

  const handleOpenExerciseDetails = (exerciseId: number) => {
    navigation.navigate('exercise', { exerciseId })
  }

  useEffect(() => {
    loadMuscleGroups()
  }, [loadMuscleGroups])

  useFocusEffect(
    useCallback(() => {
      loadExercisesByGroup(groupSelected)
    }, [groupSelected, loadExercisesByGroup]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={muscleGroups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        style={{ marginVertical: 32, maxHeight: 48, minHeight: 48 }}
      />

      <VStack px={'$8'} flex={1}>
        <HStack justifyContent="space-between" alignItems={'center'} mb={'$5'}>
          <Heading color={'$gray200'} fontSize={'$md'} fontFamily={'$heading'}>
            Exercícios
          </Heading>

          <Text color={'$gray200'} fontSize={'$sm'} fontFamily={'$body'}>
            {exerciseByGroup.length}
          </Text>
        </HStack>

        <FlatList
          data={exerciseByGroup}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              exercise={item}
              onPress={() => handleOpenExerciseDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </VStack>
    </VStack>
  )
}
