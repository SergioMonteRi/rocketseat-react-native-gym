import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { TouchableOpacityProps } from 'react-native'

export type ExerciseCardProps = TouchableOpacityProps & {
  exercise: ExerciseDTO
}
