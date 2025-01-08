import { Image } from '@gluestack-ui/themed'

import { UserPhotoProps } from './type'

export const UserPhoto = (props: UserPhotoProps) => {
  const { ...rest } = props

  return (
    <Image
      alt={props.alt}
      rounded={'$full'}
      borderWidth={'$2'}
      borderColor={'$gray400'}
      backgroundColor={'$gray500'}
      {...rest}
    />
  )
}
