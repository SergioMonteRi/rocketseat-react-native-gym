import {
  Text,
  ButtonSpinner,
  Button as GluestackButton,
} from '@gluestack-ui/themed'

import { ButtonProps } from './type'

export const Button = (props: ButtonProps) => {
  const { title, variant = 'solid', isLoading = false, ...rest } = props

  const isOutlineVariant = variant === 'outline'

  return (
    <GluestackButton
      w={'$full'}
      h={'$14'}
      rounded={'$sm'}
      disabled={isLoading}
      borderColor={'$green500'}
      borderWidth={isOutlineVariant ? '$1' : '$0'}
      bg={isOutlineVariant ? 'transparent' : '$green700'}
      $active-bg={isOutlineVariant ? '$gray500' : '$green500'}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={'$white'} />
      ) : (
        <Text
          fontSize={'$sm'}
          fontFamily={'$heading'}
          color={isOutlineVariant ? '$green500' : '$white'}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
