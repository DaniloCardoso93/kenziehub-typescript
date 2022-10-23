import { HeaderLogout } from "../../component/header";
import { useUserContext } from "../../contexts/user";
import { BodyDashbord, Div, NoTechs, PerfilDiv, UlDashBord } from "./style";
import { BsPlusSquareFill, BsFillTrashFill } from "react-icons/bs";
import { Modal } from "../../component/modal";
import { useUserTechContext } from "../../contexts/techContext";

export function Dashbord() {
  const { user, isModalVisible, openModal } = useUserContext();
  const { techDelete } = useUserTechContext();

  return (
    <Div>
      {isModalVisible ? <Modal /> : null}
      <HeaderLogout />
      <PerfilDiv>
        <h1>Olá, {user?.name}</h1>
        <span>{user?.course_module}</span>
      </PerfilDiv>
      <BodyDashbord>
        <p>Tecnologias</p>
        <BsPlusSquareFill onClick={openModal} />
      </BodyDashbord>
      {user?.techs.length ? (
        <UlDashBord>
          {user.techs.map((tecnologia) => (
            <li key={tecnologia.id} id={tecnologia.id}>
              <p>{tecnologia.title}</p>
              <div>
                <span>{tecnologia.status}</span>
                <BsFillTrashFill onClick={() => techDelete(tecnologia.id)} />
              </div>
            </li>
          ))}
        </UlDashBord>
      ) : (
        <NoTechs>Sem tecnologia cadastradas</NoTechs>
      )}
    </Div>
  );
}
