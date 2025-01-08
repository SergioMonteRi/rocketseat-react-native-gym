import { TouchableOpacityProps } from 'react-native'

export type ExerciseCardProps = TouchableOpacityProps & {
  name: string
  series: string
}
