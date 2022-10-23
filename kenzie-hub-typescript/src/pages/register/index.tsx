import { HeaderRegister } from "../../component/header";
import { PrimaryButton } from "../../styles/buttons";
import { Form } from "../../styles/form";
import { Input, Select } from "../../styles/input";
import { RegisterDiv } from "./style";

import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterSchema } from "../../validate";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { useUserContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

interface IDataRegister {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contato: string;
  modulo: string;
}

export function Register() {
  const { registerRequest, setUser, setLoading } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataRegister>({
    resolver: yupResolver(RegisterSchema),
  });

  async function onSubmit(data: IDataRegister): Promise<void> {
    const res = await registerRequest({
      email: data.email,
      password: data.password,
      name: data.nome,
      bio: data.bio,
      contact: data.contato,
      course_module: data.modulo,
    });
    if (res) {
      navigate("/");
    }
  }

  useEffect(() => {
    async function Perfil() {
      const token = localStorage.getItem("@token");

      if (token) {
        try {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
          const { data } = await api.get("/profile");
          setUser(data);
          navigate("/dashbord");
        } catch (error) {
          console.error(error);
        }
      }

      setLoading(false);
    }

    Perfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegisterDiv>
      <HeaderRegister />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Crie sua conta</h1>
        <small>Rápido e grátis, vamos nessa</small>
        <label htmlFor="nome">
          Nome
          <Input
            id="nome"
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("nome")}
          />
        </label>
        <p>{errors.nome?.message}</p>

        <label htmlFor="email">
          Email
          <Input
            id="email"
            type="email"
            placeholder="Digite aqui seu Email"
            {...register("email")}
          />
        </label>
        <p>{errors.email?.message}</p>

        <label htmlFor="password">
          Senha
          <Input
            id="password"
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
        </label>
        <p>{errors.password?.message}</p>

        <label htmlFor="confirmPassword">
          Confirmar senha
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
          />
        </label>
        <p>{errors.confirmPassword?.message}</p>

        <label htmlFor="bio">
          Bio
          <Input
            id="bio"
            type="bio"
            placeholder="Digite algo sobre você"
            {...register("bio")}
          />
        </label>
        <p>{errors.bio?.message}</p>

        <label htmlFor="contato">
          Contato
          <Input
            id="contato"
            type="contato"
            placeholder="Digite seu contato"
            {...register("contato")}
          />
        </label>
        <p>{errors.contato?.message}</p>

        <label htmlFor="modulo">
          Módulo
          <Select id="modulo" {...register("modulo")}>
            <option value="Primeiro Módulo">Primeiro Módulo</option>
            <option value="Segundo Módulo">Segundo Módulo</option>
            <option value="Terceiro Módulo">Terceiro Módulo</option>
            <option value="Quarto Módulo">Quarto Módulo</option>
            <option value="Quinto Módulo">Quinto Módulo</option>
            <option value="Sexto Módulo">Sexto Módulo</option>
          </Select>
        </label>
        <p>{errors.modulo?.message}</p>

        <PrimaryButton type="submit">Cadastrar</PrimaryButton>
      </Form>
    </RegisterDiv>
  );
}
