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

export const ExerciseCard = (props: ExerciseCardProps) => {
  const { name, series, ...rest } = props

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
            uri: 'https://img.freepik.com/vetores-gratis/mulher-levantando-peso_24908-81253.jpg',
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
            {series}
          </Text>
        </VStack>

        <Icon as={ChevronRight} color={'$gray300'} size={'xl'} />
      </HStack>
    </TouchableOpacity>
  )
}
