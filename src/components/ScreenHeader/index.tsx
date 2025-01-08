import { Center, Heading } from '@gluestack-ui/themed'

import { ScreenHeaderProps } from './types'

export const ScreenHeader = (props: ScreenHeaderProps) => {
  const { title } = props

  return (
    <Center bg={'$gray500'} pb={'$6'} pt={'$16'}>
      <Heading color={'$gray100'} fontSize={'$xl'} fontFamily={'$heading'}>
        {title}
      </Heading>
    </Center>
  )
}
