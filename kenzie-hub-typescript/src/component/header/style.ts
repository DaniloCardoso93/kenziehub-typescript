import styled from "styled-components";

export const HeaderStyle = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderRegisterStyle = styled.header`
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 450px) {
    width: 400px;
  }

  a {
    width: 56px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;

    font-size: var(--text2);

    background-color: var(--grey3);
    color: var(--grey0);
  }
`;

export const HeaderLogoutStyle = styled.header`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1250px) {
    width: 1250px;
  }
`;
