import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 50px;
  z-index: 10;
  background-color: transparent;
`;

export const NavLink = styled(Link)`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  //padding: 0.5rem 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #00d29d;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: rgba(147, 112, 219, 0.61);
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-self: flex-end;
  /* Second Nav */
  margin-right: 50px;
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
  
`;
export const GlassBtn = styled.button`
    display: inline-block;
    color: #171616;
  padding: 5px 15px;
    text-decoration: none;
    border-radius: 15px;
    background-color: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(30px);
    font-size: 14px;
    cursor: pointer;
  :hover {
      background-color: rgba(255,255,255,0.2);
  }

`
export const InlineSpan = styled.span `
margin: 2px;
`
/*
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
/* justify-content: flex-end;
width: 100vw;
@media screen and (max-width: 768px) {
  display: none;
}
`;
*/
/*
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
    */