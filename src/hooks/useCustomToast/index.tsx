import { useToast } from '@gluestack-ui/themed'

import { AppError } from '@utils/AppError'

import { ToastMessage } from '@components/ToastMessage'

import { ShowToastProps } from './types'

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = (props: ShowToastProps) => {
    const {
      type,
      error,
      description,
      alternativeMessage,
      placement = 'top',
    } = props

    const isAppError = error instanceof AppError

    const title = isAppError
      ? error.message
      : alternativeMessage || 'Ocorreu um erro. Por favor tente mais tarde.'

    toast.show({
      placement,
      render: ({ id }) => (
        <ToastMessage
          id={id}
          type={type}
          title={title}
          description={description}
          onClose={() => toast.close(id)}
        />
      ),
    })
  }

  return { showToast }
}
