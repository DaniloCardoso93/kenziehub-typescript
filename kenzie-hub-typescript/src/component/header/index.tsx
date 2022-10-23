import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { NormalButton } from "../../styles/buttons";
import { HeaderLogoutStyle, HeaderRegisterStyle, HeaderStyle } from "./style";

export function HeaderLogin() {
  return (
    <HeaderStyle>
      <img src={logo} alt="Kenzie Hub" />
    </HeaderStyle>
  );
}

export function HeaderRegister() {
  return (
    <HeaderRegisterStyle>
      <img src={logo} alt="Kenzie Hub" />
      <Link to={"/"}>Voltar</Link>
    </HeaderRegisterStyle>
  );
}

export function HeaderLogout() {
  const navigate = useNavigate();

  function clearLocalStorage(): void {
    window.localStorage.clear();
    navigate("/");
  }

  return (
    <HeaderLogoutStyle>
      <img src={logo} alt="Kenzie Hub" />
      <NormalButton type="button" onClick={clearLocalStorage}>
        Sair
      </NormalButton>
    </HeaderLogoutStyle>
  );
}
