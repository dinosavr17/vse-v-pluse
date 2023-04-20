import React from "react";
import {Products} from './Products'
import hero_image from '../../images/productsClothes.png';
import hero1_image from '../../images/Collegue events.png';
import styled from "styled-components";
import * as S from "../Navigation/NavbarElements";
import Logotype from "../../images/Logotype.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import './Shop.css'



const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`;
const ContainerMini = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fdf2e2;
`;
const TitleImage = styled.img`
  max-width: 50%;
  gap: 10px;
`;


export const ShopPage = () => {
    return (
        <div className="wrapper_shop">
            <S.Nav>
                <div>
                    <S.NavLink to='/main'>
                        <img className="logoImage" src={Logotype} alt='logo'/>
                    </S.NavLink>
                </div>
                <div>
                    <S.NavLink to="/login"><S.GlassBtn><S.InlineSpan><FontAwesomeIcon icon={faUserAstronaut}/></S.InlineSpan><S.InlineSpan>Войти</S.InlineSpan></S.GlassBtn></S.NavLink>
                </div>
            </S.Nav>
        <Container>
            {/*<ContainerMini>*/}
            {/*<TitleImage src={hero_image} alt="Изображение" />*/}
            {/*    <TitleImage src={hero1_image} alt="Изображение" />*/}
            {/*</ContainerMini>*/}
        <Products/>
        </Container>
        </div>
    )

}