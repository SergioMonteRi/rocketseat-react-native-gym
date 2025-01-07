import { LogOut } from 'lucide-react-native'
import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'

import { UserPhoto } from '@components/UserPhoto'

export const HomeHeader = () => {
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
        source={{ uri: 'https://github.com/sergiomonteri.png' }}
      />

      <VStack flex={1}>
        <Text color={'$gray100'} fontSize={'$sm'}>
          Olá,
        </Text>
        <Heading color={'$gray100'} fontSize={'$md'}>
          Sergio Ribeiro
        </Heading>
      </VStack>

      <Icon as={LogOut} color={'$gray200'} size={'xl'} />
    </HStack>
  )
}
