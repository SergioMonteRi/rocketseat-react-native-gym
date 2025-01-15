import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Box,
  Text,
  Icon,
  Image,
  HStack,
  VStack,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed'

import { useExercise } from '@hooks/useExercise'

import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { api } from '@services/api'

import { AppNavigationRouteProps } from '@routes/app/types'

import { ExerciseRouteParams } from './types'

import BodySVG from '@assets/body.svg'
import Series from '@assets/series.svg'
import Repetitions from '@assets/repetitions.svg'

export const Exercise = () => {
  const navigation = useNavigation<AppNavigationRouteProps>()

  const route = useRoute()
  const { exerciseId } = route.params as ExerciseRouteParams

  const {
    exerciseDetails,
    isExerciseDetailsLoading,
    isExerciseCompletionLoading,
    loadExerciseDetails,
    registerExerciseHistory,
  } = useExercise()

  const { name, group, series, repetitions, demo } = exerciseDetails

  const handleGoBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    loadExerciseDetails(exerciseId)
  }, [exerciseId, loadExerciseDetails])

  if (isExerciseDetailsLoading) {
    return <Loading />
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
            {name}
          </Heading>

          <HStack alignItems={'center'}>
            <BodySVG />
            <Text color={'$gray200'} ml={'$1'} textTransform={'capitalize'}>
              {group}
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
              uri: `${api.defaults.baseURL}/exercise/demo/${demo}`,
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
                  {series} séries
                </Text>
              </HStack>
              <HStack columnGap={'$2'}>
                <Repetitions />
                <Text color={'$gray100'} fontFamily={'$body'} fontSize={'$lg'}>
                  {repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              title={'Marcar como realizado'}
              isLoading={isExerciseCompletionLoading}
              onPress={() => registerExerciseHistory(exerciseId)}
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
