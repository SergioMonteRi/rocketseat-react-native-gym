import { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { HomeHeader } from '@components/HomeHeader'
import { MuscleGroup } from '@components/MuscleGroup'
import { ExerciseCard } from '@components/ExerciseCard'

import { AppNavigationRouteProps } from '@routes/app/types'

const exercises = [
  {
    name: 'Supino reto',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Puxada frontal',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Leg press',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Desenvolvimento',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Rosca direta',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Tríceps testa',
    series: '4 séries de 10 repetições',
  },
  {
    name: 'Abdominal',
    series: '4 séries de 10 repetições',
  },
]

const groups = [
  'Peito',
  'Costas',
  'Pernas',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Abdômen',
]

export const Home = () => {
  const navigation = useNavigation<AppNavigationRouteProps>()

  const [groupeSelected, setGroupeSelected] = useState('Costas')

  const handleOpenExerciseDetails = () => {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            name={item}
            isActive={groupeSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupeSelected(item)}
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
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ExerciseCard
              name={item.name}
              series={item.series}
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </VStack>
    </VStack>
  )
}
