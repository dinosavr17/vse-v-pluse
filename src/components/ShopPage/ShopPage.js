import React from "react";
import {Products} from './Products'
import hero_image from '../../images/Clothes.png';
import hero1_image from '../../images/Collegue events.png';
import styled from "styled-components";

const Container = styled.div`
  //background-image: linear-gradient(to right, #e5a295 0%, #f97c23 100%);
  padding: 20px;
  display: flex;
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
        <Container>
            <ContainerMini>
            <TitleImage src={hero_image} alt="Изображение" />
                <TitleImage src={hero1_image} alt="Изображение" />
            </ContainerMini>
        <Products/>
        </Container>
    )

}