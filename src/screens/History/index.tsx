import { useCallback } from 'react'
import { SectionList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Heading, Text, VStack } from '@gluestack-ui/themed'

import { useExercise } from '@hooks/useExercise'

import { Loading } from '@components/Loading'
import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export const History = () => {
  const { exerciseHistory, isExerciseHistoryLoading, loadExerciseHistory } =
    useExercise()

  useFocusEffect(
    useCallback(() => {
      loadExerciseHistory()
    }, [loadExerciseHistory]),
  )

  if (isExerciseHistoryLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title={'Histórico'} />

      <SectionList
        sections={exerciseHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryCard exercise={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            mb={'$3'}
            mt={'$10'}
            fontSize={'$md'}
            color={'$gray200'}
            fontFamily={'$heading'}
          >
            {title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={{
          paddingBottom: 32,
          ...(exerciseHistory.length === 0 && {
            flex: 1,
            justifyContent: 'center',
          }),
        }}
        ListEmptyComponent={() => (
          <Text color={'$gray100'} fontSize={'$lg'} textAlign={'center'}>
            Não há exercícios registrados ainda.{'\n'}Bora treinar hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
