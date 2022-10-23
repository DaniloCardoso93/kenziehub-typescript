import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  SetStateAction,
} from "react";
import { api } from "../api";
import { ErrorToast, SucessToast } from "../toast";

interface ITechProviderProps {
  children: ReactNode;
}

interface ITechRegister {
  status: string;
  title: string;
}

interface ITechRegisterResponse {
  id: string;
  title: string;
  status: string;
  user: {
    id: string;
  };
  created_at: string;
  updated_at: string;
}

interface ITechContext {
  tech: boolean;
  setTech: React.Dispatch<SetStateAction<boolean>>;
  techRegister(data: ITechRegister): Promise<ITechRegisterResponse>;
  techDelete(id: string): void;
}

export const techContext = createContext<ITechContext>({} as ITechContext);

export function TechProvider({ children }: ITechProviderProps) {
  const [tech, setTech] = useState(false);

  async function techRegister(data: ITechRegister) {
    const token = localStorage.getItem("@token");
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const res = await api.post("/users/techs", data);
      SucessToast("Tecnologia cadastrada com sucesso");
      setTech(true);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const erro = error.response?.data.message;
        ErrorToast(erro);
        return erro;
      }
    }
  }

  async function techDelete(id: string) {
    try {
      await api.delete(`/users/techs/${id}`);
      SucessToast("Tecnologia excluida com sucesso");
      setTech(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const erro = error.response?.data.message;
        ErrorToast(erro);
      }
    }
  }

  return (
    <techContext.Provider value={{ tech, setTech, techRegister, techDelete }}>
      {children}
    </techContext.Provider>
  );
}

export function useUserTechContext(): ITechContext {
  const context = useContext(techContext);

  return context;
}
