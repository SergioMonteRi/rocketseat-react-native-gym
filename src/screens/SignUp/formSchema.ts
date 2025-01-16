import * as yup from 'yup'

export const signUpSchema = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\s]+$/,
      'Formato inválido: o nome deve conter apenas letras e espaços',
    )
    .required('Nome é obrigatório'),

  email: yup.string().email('E-mail inválido').required('Email é obrigatório'),

  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres')
    .required('Senha é obrigatória'),

  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password'), ''], 'Senhas não conferem'),
})
