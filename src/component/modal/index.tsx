import { Form } from "../../styles/form";
import { Input, Select } from "../../styles/input";
import { PrimaryButton } from "../../styles/buttons";
import { BgModal, DivModal, TitleModal } from "./style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TechsRegister } from "../../validate";
import { useUserTechContext } from "../../contexts/techContext";
import { useUserContext } from "../../contexts/user";

interface IData {
  title: string;
  status: string;
}

export function Modal() {
  const { techRegister } = useUserTechContext();
  const { closeModal } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({
    resolver: yupResolver(TechsRegister),
  });

  const onSubmit = async (data: IData) => {
    const res = await techRegister(data);
    if (res) {
      closeModal();
    }
  };

  return (
    <BgModal>
      <DivModal>
        <TitleModal>
          <p>Cadastrar Tecnologia</p>
          <span onClick={closeModal}>X</span>
        </TitleModal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            Nome
            <Input
              type="text"
              id="title"
              placeholder="Digite o nome da tecnologia"
              {...register("title")}
            />
          </label>
          <p>{errors.title?.message}</p>
          <label>
            Selecionar Status
            <Select id="status" {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </Select>
          </label>

          <PrimaryButton>Cadastrar Tecnologia</PrimaryButton>
        </Form>
      </DivModal>
    </BgModal>
  );
}
