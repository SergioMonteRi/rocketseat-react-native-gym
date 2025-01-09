import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

export const HistoryCard = () => {
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
          Costas
        </Heading>
        <Text color={'$gray100'} fontSize={'$lg'}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color={'$gray300'} fontSize={'$md'}>
        08:56
      </Text>
    </HStack>
  )
}
