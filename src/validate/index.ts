import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Deve ser um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória'),
});

export const RegisterSchema = yup.object({
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Deve ser uma email válido").required("Email é obrigatório"),
  password: yup.string().required("Senha obrigatória").min(6, "Senha precisa conter 6 dígitos"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Confirmação de senha deve ser igual a senha'),
  bio: yup.string().required("Fale algo sobre você"),
  contato: yup.string().required("Digite seu contato"),
})

export const TechsRegister = yup.object({
  title: yup.string().required("Nome da tecnologia obrigatório")
})
