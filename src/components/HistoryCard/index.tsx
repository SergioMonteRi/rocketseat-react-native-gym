import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { HistoryCardProps } from './types'

export const HistoryCard = (props: HistoryCardProps) => {
  const { exercise } = props
  const { name, group, hour } = exercise

  return (
    <HStack
      px={'$5'}
      py={'$4'}
      mb={'$3'}
      w={'$full'}
      bg={'$gray500'}
      rounded={'$md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack mr={'$5'}>
        <Heading
          color={'$white'}
          fontSize={'$md'}
          numberOfLines={1}
          fontFamily={'$heading'}
          textTransform={'capitalize'}
        >
          {group}
        </Heading>
        <Text color={'$gray100'} fontSize={'$lg'}>
          {name}
        </Text>
      </VStack>

      <Text color={'$gray300'} fontSize={'$md'}>
        {hour}
      </Text>
    </HStack>
  )
}
