import { Image } from '@gluestack-ui/themed'

import { UserPhotoProps } from './type'

export const UserPhoto = (props: UserPhotoProps) => {
  const { ...rest } = props

  return (
    <Image
      rounded={'$full'}
      borderWidth={'$2'}
      borderColor={'$gray400'}
      backgroundColor={'$gray500'}
      alt={props.alt}
      {...rest}
    />
  )
}
