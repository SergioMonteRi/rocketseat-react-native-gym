import { useState } from 'react'
import { FlatList } from 'react-native'
import { VStack } from '@gluestack-ui/themed'

import { HomeHeader } from '@components/HomeHeader'
import { MuscleGroup } from '@components/MuscleGroup'

export const Home = () => {
  const groups = [
    'Peito',
    'Costas',
    'Pernas',
    'Ombros',
    'Bíceps',
    'Tríceps',
    'Abdômen',
  ]

  const [groupeSelected, setGroupeSelected] = useState('Costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MuscleGroup
            name={item}
            isActive={groupeSelected === item}
            onPress={() => setGroupeSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        style={{ marginVertical: 32, maxHeight: 48, minHeight: 48 }}
      />
    </VStack>
  )
}
