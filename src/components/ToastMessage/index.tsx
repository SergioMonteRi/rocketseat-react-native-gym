import {
  Icon,
  Toast,
  VStack,
  Pressable,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed'
import { X } from 'lucide-react-native'

import { ToastMessageProps } from './types'

export const ToastMessage = (props: ToastMessageProps) => {
  const { description, type = 'success', id, title, onClose } = props

  return (
    <Toast
      mt={'$10'}
      action={type}
      nativeID={`toast-${id}`}
      bgColor={type === 'success' ? '$green500' : '$red500'}
    >
      <VStack space={'xs'} w={'$full'}>
        <Pressable alignSelf={'flex-end'} onPress={onClose}>
          <Icon as={X} color={'$coolGray50'} size={'md'} />
        </Pressable>

        <ToastTitle color={'$white'} fontFamily={'$heading'}>
          {title}
        </ToastTitle>

        {description && (
          <ToastDescription color={'$white'} fontFamily={'$body'}>
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
