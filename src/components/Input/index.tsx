import {
  InputField,
  FormControl,
  FormControlErrorText,
  Input as GluestackInput,
  FormControlError,
} from '@gluestack-ui/themed'

import { InputProps } from './types'

export const Input = (props: InputProps) => {
  const {
    hasError = false,
    isReadOnly = false,
    errorMessage = null,
    ...rest
  } = props

  const { bg } = rest

  const isInvalid = !!errorMessage || hasError

  return (
    <FormControl isInvalid={isInvalid} mb={'$2'}>
      <GluestackInput
        h={'$14'}
        w={'$full'}
        borderWidth={'$0'}
        borderRadius={'$md'}
        isInvalid={isInvalid}
        bg={bg || '$gray600'}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
        $invalid={{
          borderWidth: '$1',
          borderColor: '$red500',
        }}
        $focus={{
          borderWidth: '$1',
          borderColor: isInvalid ? '$red500' : '$green300',
        }}
      >
        <InputField
          px={'$4'}
          color={'$white'}
          fontFamily={'$body'}
          placeholderTextColor={'$gray300'}
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color={'$red500'}>
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
