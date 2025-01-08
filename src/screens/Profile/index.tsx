import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'
import { Button } from '@components/Button'

export const Profile = () => {
  return (
    <VStack flex={1}>
      <ScreenHeader title={'Perfil'} />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={'$6'} px={'$10'}>
          <UserPhoto
            size={'xl'}
            alt={'Foto de perfil'}
            source={{ uri: 'https://github.com/sergiomonteri.png' }}
          />

          <TouchableOpacity>
            <Text
              mt={'$2'}
              mb={'$8'}
              fontSize={'$md'}
              color={'$green500'}
              fontFamily={'$heading'}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w={'$full'} gap={'$4'}>
            <Input placeholder={'Nome'} bg={'$gray600'} />
            <Input
              bg={'$gray600'}
              value={'sergioribeiropalermo@gmail.com'}
              isReadOnly
            />
          </Center>

          <Heading
            mb={'$2'}
            mt={'$12'}
            fontSize={'$md'}
            color={'$gray200'}
            fontFamily={'$heading'}
            alignSelf={'flex-start'}
          >
            Alterar senha
          </Heading>

          <Center w={'$full'} gap={'$4'}>
            <Input
              bg={'$gray600'}
              placeholder={'Senha antiga'}
              secureTextEntry
            />
            <Input bg={'$gray600'} placeholder={'Nova senha'} secureTextEntry />
            <Input
              bg={'$gray600'}
              placeholder={'Confirmar nova senha'}
              secureTextEntry
            />

            <Button title={'Atualizar'} mt={'$2'} />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
