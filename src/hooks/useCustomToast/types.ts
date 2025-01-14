import { InterfaceToastProps } from '@gluestack-ui/toast/src/types'

type ToastType = 'error' | 'success' | 'warning'

export type ShowToastProps = {
  type: ToastType
  error?: unknown
  description?: string
  alternativeMessage?: string
  placement?: InterfaceToastProps['placement']
}
