import { ComponentProps } from 'react'
import { Button as GluestackButton } from '@gluestack-ui/themed'

export type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}
