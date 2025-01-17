import { LogOut } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'

import { api } from '@services/api'

import { useAuth } from '@hooks/useAuth'

import { UserPhoto } from '@components/UserPhoto'

import defaultUserPhoto from '@assets/userPhotoDefault.png'

export const HomeHeader = () => {
  const { user, singOut } = useAuth()
  const { name, avatar } = user

  return (
    <HStack
      pt={'$16'}
      pb={'$5'}
      px={'$8'}
      gap={'$4'}
      bg={'$gray600'}
      alignItems={'center'}
    >
      <UserPhoto
        w={'$16'}
        h={'$16'}
        alt={'User profile picture'}
        source={
          avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${avatar}` }
            : defaultUserPhoto
        }
      />

      <VStack flex={1}>
        <Text color={'$gray100'} fontSize={'$sm'}>
          Olá,
        </Text>
        <Heading color={'$gray100'} fontSize={'$md'}>
          {name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={singOut}>
        <Icon as={LogOut} color={'$gray200'} size={'xl'} />
      </TouchableOpacity>
    </HStack>
  )
}
