export type UserDTO = {
  id: string
  name: string
  email: string
  avatar: string
}

export type UserProfileUpdateDTO = {
  name: string
  password: string
  old_password: string
}
