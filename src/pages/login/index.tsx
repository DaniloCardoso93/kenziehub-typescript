import { useForm } from "react-hook-form";
import { HeaderLogin } from "../../component/header";
import { PrimaryButton } from "../../styles/buttons";
import { Form } from "../../styles/form";
import { LoginInput } from "../../styles/input";
import { DivFormLogin } from "./style";

import { yupResolver } from "@hookform/resolvers/yup";

import { Link, useNavigate } from "react-router-dom";

import { LoginSchema } from "../../validate";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/user";
import { api } from "../../api";

interface IDataLogin {
  email: string;
  password: string;
}

export function Login() {
  const { LoginRequest, setUser, setLoading } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataLogin>({
    resolver: yupResolver(LoginSchema),
  });

  async function onSubmit(data: IDataLogin): Promise<void> {
    const res = await LoginRequest(data);

    const resId = window.localStorage.getItem("@userId");

    if (res.id === resId) {
      navigate("/dashbord");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    async function Perfil() {
      const token = localStorage.getItem("@token");

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
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
    <>
      <DivFormLogin>
        <HeaderLogin />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <LoginInput
            id="email"
            type="email"
            placeholder="Digite seu Email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>

          <label htmlFor="password">
            Password
            <LoginInput
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
          </label>
          <p>{errors.password?.message}</p>
          <PrimaryButton type="submit">Entrar</PrimaryButton>

          <small>Ainda não possui uma conta?</small>

          <Link to={"/register"}>Cadastre-se</Link>
        </Form>
      </DivFormLogin>
    </>
  );
}
