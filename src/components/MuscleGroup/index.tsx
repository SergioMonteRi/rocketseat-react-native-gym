import { Button, Text } from '@gluestack-ui/themed'

import { ExerciseGroupProps } from './types'

export const MuscleGroup = (props: ExerciseGroupProps) => {
  const { name, isActive, ...rest } = props

  return (
    <Button
      h={'$10'}
      mr={'$3'}
      bg={'$gray600'}
      rounded={'$md'}
      minWidth={'$24'}
      alignItems={'center'}
      justifyContent={'center'}
      borderColor={'$green500'}
      borderWidth={isActive ? 1 : 0}
      sx={{
        ':active': {
          borderWidth: 1,
        },
      }}
      {...rest}
    >
      <Text
        fontSize={'$xs'}
        fontFamily={'$heading'}
        textTransform={'uppercase'}
        color={isActive ? '$green500' : '$gray200'}
      >
        {name}
      </Text>
    </Button>
  )
}
