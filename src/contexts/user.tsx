import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import { api } from "../api";
import { ErrorToast, SucessToast } from "../toast";
import { useUserTechContext } from "./techContext";

interface IUserProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar_url: string | null;
  contact: string;
  course_module: string;
  create_at: string;
  techs: [
    {
      id: string;
      title: string;
      status: string;
      create_at: string;
      update_at: string;
    }
  ];
  update_at: string;
  works: [];
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  bio: string;
  contact: string;
  course_module: string;
}

interface IRegisterUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  contact: string;
  course_module: string;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  openModal(): void;
  closeModal(): void;
  LoginRequest(data: ILoginUser): Promise<IUser>;
  PerfilRequest(): void;
  registerRequest(data: IRegisterUser): Promise<IRegisterUserResponse>;
}

export const userContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { tech, setTech } = useUserTechContext();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function openModal(): void {
    setIsModalVisible(true);
  }

  function closeModal(): void {
    setIsModalVisible(false);
  }

  const LoginRequest = async (data: ILoginUser) => {
    try {
      const res = await api.post("/sessions", data);
      window.localStorage.setItem("@token", res.data.token);
      window.localStorage.setItem("@userId", res.data.user.id);
      SucessToast("Login realizado com sucesso");
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const erro = error.response?.data.message;
        ErrorToast(erro);
        return erro;
      }
    }
  };

  const registerRequest = async (data: IRegisterUser) => {
    try {
      const res = await api.post("/users", data);
      SucessToast("Cadastro realizado com sucesso");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const erro = error.message;
        ErrorToast(erro);
        return erro;
      }
    }
  };

  const PerfilRequest = async () => {
    const token = localStorage.getItem("@token");
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const { data } = await api.get("/profile");
      setUser(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    async function Perfil() {
      const token = localStorage.getItem("@token");

      if (token) {
        try {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
          const { data } = await api.get("/profile");
          setUser(data);
        } catch (error) {
          console.error(error);
          window.localStorage.clear();
        }
      }
      setTech(false);
      setLoading(false);
    }

    Perfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        isModalVisible,
        setIsModalVisible,
        openModal,
        closeModal,
        LoginRequest,
        PerfilRequest,
        registerRequest,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext(): IUserContext {
  const context = useContext(userContext);

  return context;
}
