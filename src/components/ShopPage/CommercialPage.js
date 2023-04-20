import React from 'react';
import styled from "styled-components";
import * as S from "../Navigation/NavbarElements";
import Logotype from "../../images/Logotype.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import present from '../../images/Present.png'
import clothes from '../../images/productsClothes.png'
import hashTag from '../../images/hashtagTeam.png'
import arrow from '../../images/arrrow.png'
import hoodie from '../../images/hoodie.png'
import polo from '../../images/polo.png'
import tomka from '../../images/tomka-1.png'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Wrapper = styled.div`
  padding: 0 50px;
  background-color: #ffeddf;
  width: 100vw;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  font-family: Lora;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: 'eventsBlock merchBlock';
  height: 100vh;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  grid-auto-columns: 0.6fr 0.4fr;
  padding-top: 20px;
`;
const EventsBlock = styled.div `
  grid-area: eventsBlock;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`
const EventsImgBlock = styled.div `
  background-color: #fdce93;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  width: 100vh;
`

const EventsImg = styled.img `
  width: 255px;
  height: 100%;
  border-radius: 10px;
  
`
const MerchProfileContainer = styled.div `
  display: flex;
  flex-direction: column;
`
const MerchBlock = styled.div `
  grid-area: merchBlock;
  border-radius: 10px;
  display: flex;
  justify-items: center;
  background-color: burlywood;
  height: 360px;
`
const MerchImg = styled.img `
  @media (min-width: 768px) {
    width: 300px;
    height: 360px;
  }
  @media (min-width: 1024px) {
    width: 450px;
    height: 550px;
  }
  border-radius: 10px;
`
const PoloImg = styled.img `
width: 300px;
`;
const EventsTitle = styled.h2 `
font-family: "Courier New";
  font-size: 42px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const EventsButton = styled.button `
  font-family: "Courier New";
  padding: 15px;
  border-radius: 10px;
  background-color: #F57838;
  margin-right: 10px;
`
const MerchButton = styled.button `
  font-family: "Courier New";
  padding: 15px;
  border-radius: 10px;
  background-color: #f4f0ff;
`
const ButtonsBlock = styled.div `
display: flex;
  padding: 10px;
  flex-direction: row;
`
const TeamImg = styled.img `
max-width: 150px;
  rotate: 343deg;
  padding-top: 45px;
`;
const ArrowImg = styled.img `
max-width: 150px;
  rotation: 45deg;
`;

const AsideImagesBlock = styled.div `
`;
const MainImageBlock = styled.div `
`
const DetailsPanel = styled.div `
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(50px);
  z-index: 90;
  padding: 10px;
  position: absolute;
`
const InnerCardImage = styled.img `
    max-height: 60px;
`;
const ProfileLinkBlock = styled.div `
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(80px);
  padding: 10px;
  max-width: 300px;
  font-family: "Courier New";
  display: flex;
  flex-direction: row;
`
const TomkaImage = styled.img`
width: 250px;
  height: 200px;
`
const AccordionDetailsPanel = styled.div `
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(50px);
  padding: 10px;
  display: flex;
  flex-direction: row;
`



export const CommercialPage = () => {
    return (
        <Wrapper>
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
            <EventsBlock>
                <EventsImgBlock>
                    <MainImageBlock>
                        <EventsImg src={present}/>
                    </MainImageBlock>
                    <AsideImagesBlock>
                        <ArrowImg src={arrow}/>
                    <TeamImg src={hashTag}/>
                    </AsideImagesBlock>
                </EventsImgBlock>
                <div><EventsTitle>
                    Мероприятия&<br/>
                    Коллеги</EventsTitle>
                <div>
                    {/*<Accordion*/}
                    {/*    sx={{*/}
                    {/*        borderRadius: '10px',*/}
                    {/*        backgroundColor: '#c9cdd2',*/}
                    {/*    }}>*/}
                    {/*    <AccordionSummary*/}
                    {/*        expandIcon={<ExpandMoreIcon />}*/}
                    {/*        aria-controls="panel1a-content"*/}
                    {/*        id="panel1a-header"*/}
                    {/*    >*/}
                    {/*        <Typography>Мастерклассы</Typography>*/}
                    {/*    </AccordionSummary>*/}
                    {/*    <AccordionDetails>*/}
                    {/*        <AccordionDetailsPanel>*/}
                    {/*            <InnerCardImage src={polo}/>*/}
                    {/*            <Typography>*/}
                    {/*                Мастер-классы по интересующим коллегам темам. Это может быть мастер-класс по кулинарии,*/}
                    {/*                рисованию, рукоделию или другой теме, которая вызывает интерес у сотрудников.*/}
                    {/*            </Typography>*/}
                    {/*        </AccordionDetailsPanel>*/}
                    {/*    </AccordionDetails>*/}
                    {/*</Accordion>*/}
                </div>
                    <ButtonsBlock>
                        <EventsButton>В магазин мероприятий</EventsButton>
                        <MerchButton>В магазин мерча</MerchButton>
                    </ButtonsBlock>
                </div>
            </EventsBlock>
                <MerchBlock>
                    <MerchImg src={clothes}/>
                    <DetailsPanel>
                        <InnerCardImage src={polo}/>
                    </DetailsPanel>
                </MerchBlock>
                {/*<ProfileLinkBlock>*/}
                {/*    <TomkaImage src={tomka}/>*/}
                {/*    <p>Переходите в свой профиль</p>*/}
                {/*</ProfileLinkBlock>*/}
            </Container>
        </Wrapper>
    );
}
