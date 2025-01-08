import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'

// import { EyeClosed } from 'lucide-react-native'

import { InputProps } from './types'

export const Input = (props: InputProps) => {
  const { isReadOnly = false, ...rest } = props

  const { bg } = rest

  return (
    <GluestackInput
      h={'$14'}
      borderWidth={'$0'}
      borderRadius={'$md'}
      $focus={{
        borderWidth: '$1',
        borderColor: '$green300',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
      bg={bg || '$gray600'}
    >
      <InputField
        px={'$4'}
        color={'$white'}
        fontFamily={'$body'}
        placeholderTextColor={'$gray300'}
        {...rest}
      />

      {/* <InputSlot pr={'$4'}>
        <InputIcon>
          <Icon as={EyeClosed} color={'$gray100'} />
        </InputIcon>
      </InputSlot> */}
    </GluestackInput>
  )
}
