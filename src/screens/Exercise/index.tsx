import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import {
  VStack,
  Text,
  Icon,
  HStack,
  Heading,
  Image,
  Box,
  ScrollView,
} from '@gluestack-ui/themed'

import { AppNavigationRouteProps } from '@routes/app/types'

import BodySVG from '@assets/body.svg'
import Series from '@assets/series.svg'
import Repetitions from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export const Exercise = () => {
  const navigation = useNavigation<AppNavigationRouteProps>()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={'$8'} bg={'$gray500'} pt={'$12'}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color={'$green500'} size={'xl'} />
        </TouchableOpacity>

        <HStack
          mt={'$4'}
          mb={'$8'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading
            flexShrink={1}
            fontSize={'$lg'}
            color={'$gray100'}
            fontFamily={'$heading'}
          >
            Puxada frontal
          </Heading>

          <HStack alignItems={'center'}>
            <BodySVG />
            <Text color={'$gray200'} ml={'$1'} textTransform={'capitalize'}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 62 }}
      >
        <VStack p={'$8'} rowGap={'$4'}>
          <Image
            source={{
              uri: 'https://img.freepik.com/vetores-gratis/mulher-levantando-peso_24908-81253.jpg',
            }}
            w={'$full'}
            h={'$80'}
            rounded={'$lg'}
            alt={'Gym exercise'}
            resizeMode={'cover'}
          />

          <Box p={'$4'} bg={'$gray500'} rowGap={'$8'} rounded={'$lg'}>
            <HStack mt={'$2'} alignItems="center" justifyContent="space-around">
              <HStack columnGap={'$2'}>
                <Series />
                <Text color={'$gray100'} fontFamily={'$body'} fontSize={'$lg'}>
                  3 séries
                </Text>
              </HStack>
              <HStack columnGap={'$2'}>
                <Repetitions />
                <Text color={'$gray100'} fontFamily={'$body'} fontSize={'$lg'}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title={'Marcar como realizado'} />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
