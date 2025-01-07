import { ComponentProps } from 'react'
import { Button } from '@gluestack-ui/themed'

export type ExerciseGroupProps = ComponentProps<typeof Button> & {
  name: string
  isActive: boolean
}
