import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'

import { InputProps } from './types'

export const Input = (props: InputProps) => {
  const { ...rest } = props

  return (
    <GluestackInput
      h={'$14'}
      px={'$4'}
      bg={'$gray700'}
      borderWidth={'$0'}
      borderRadius={'$md'}
      $focus={{
        borderWidth: '$1',
        borderColor: '$green300',
      }}
    >
      <InputField
        color={'$white'}
        fontFamily={'$body'}
        placeholderTextColor={'$gray300'}
        {...rest}
      />
    </GluestackInput>
  )
}
