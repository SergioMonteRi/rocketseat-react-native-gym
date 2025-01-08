import { SectionList } from 'react-native'
import { Heading, Text, VStack } from '@gluestack-ui/themed'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export const History = () => {
  const exerciseHistory = [
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Rosca direta', 'Rosca alternada'],
    },
    {
      title: '27.08.22',
      data: ['Puxada frontal', 'Rosca direta', 'Rosca alternada'],
    },
  ]

  return (
    <VStack flex={1}>
      <ScreenHeader title={'Histórico'} />

      <SectionList
        sections={exerciseHistory}
        keyExtractor={(item, index) => item + index}
        renderItem={() => <HistoryCard />}
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
