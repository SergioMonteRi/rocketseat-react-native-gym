import * as yup from 'yup'

export const signInSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('Email é obrigatório'),

  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres')
    .required('Senha é obrigatória'),
})
