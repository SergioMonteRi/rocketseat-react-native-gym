import { TouchableOpacity } from 'react-native'
import {
  Icon,
  Text,
  Image,
  HStack,
  VStack,
  Heading,
} from '@gluestack-ui/themed'
import { ChevronRight } from 'lucide-react-native'

import { ExerciseCardProps } from './types'
import { api } from '@services/api'

export const ExerciseCard = (props: ExerciseCardProps) => {
  const { exercise, ...rest } = props
  const { name, series, repetitions, thumb } = exercise

  console.log(exercise)

  return (
    <TouchableOpacity {...rest}>
      <HStack
        p={'$2'}
        mb={'$3'}
        pr={'$4'}
        bg={'$gray500'}
        rounded={'$md'}
        alignItems={'center'}
      >
        <Image
          alt={'Gym exercise'}
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}`,
          }}
          w={'$16'}
          h={'$16'}
          mr={'$4'}
          rounded={'$md'}
          resizeMode={'cover'}
        />

        <VStack flex={1} rowGap={'$1'}>
          <Heading color={'$white'} fontSize={'$lg'} fontFamily={'$heading'}>
            {name}
          </Heading>
          <Text
            fontSize={'$sm'}
            numberOfLines={2}
            color={'$gray200'}
            fontFamily={'$body'}
          >
            {series} séries X {repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color={'$gray300'} size={'xl'} />
      </HStack>
    </TouchableOpacity>
  )
}
