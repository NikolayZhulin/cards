import * as yup from 'yup'

const emailRules = yup.string().email().required()
const passRules = yup.string().min(8).max(32).required()
const confirmPassRules = yup
  .string()
  .required()
  .oneOf([yup.ref('password')], 'Passwords does not match')

export const schemaRegister = yup.object().shape({
  email: emailRules,
  password: passRules,
  confirmPwd: confirmPassRules,
})

export const schemaLogin = yup.object().shape({
  email: emailRules,
  password: passRules,
})

export const schemaEmail = yup.object().shape({
  email: emailRules,
})

export const schemaPass = yup.object().shape({
  password: passRules,
})
