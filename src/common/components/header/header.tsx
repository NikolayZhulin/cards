import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../path/path";

export const Header = () => {
  return (
    <HeaderComponent>
      <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
      <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
      <NavLink to={PATH.RECOVERY_PASSWORD}>RECOVERY PASSWORD</NavLink>
      <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
      <NavLink to={PATH.NEW_PASSWORD}>NEW PASSWORD</NavLink>
    </HeaderComponent>
  );
};

export const HeaderComponent = styled.header`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #b31232;
`;
