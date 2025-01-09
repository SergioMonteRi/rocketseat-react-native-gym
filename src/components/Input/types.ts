import { ComponentProps } from 'react'

import { InputField } from '@gluestack-ui/themed'

export type InputProps = ComponentProps<typeof InputField> & {
  hasError?: boolean
  isReadOnly?: boolean
  errorMessage?: string | null
}
