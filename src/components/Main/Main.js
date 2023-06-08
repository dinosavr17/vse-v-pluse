import React, {useEffect, useState} from 'react';
import './Main.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import tomka_1 from '../../images/tomka-1.png'
import  lottie from "lottie-web";
import shop_icon from '../../lotties/shop-icon.json'
import conversation from '../../lotties/conversation.json'
import developer from '../../lotties/developer.json'
import event from '../../lotties/event.json'
import news from '../../lotties/news.json'
import rules from '../../lotties/rules.json'
import rate from '../../lotties/rate.json'
import * as S from "../../components/Navigation/NavbarElements";
import {Navbar} from "../Navigation/Navbar";
import Logotype from "../../images/Logotype.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from "../../api/axios";


const CardImage = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 150px;
`;
export const SideNav = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  max-width: 80%;
  max-height: 60%;
  margin: auto;
  justify-content: center;
  display: grid;
  @media (min-width: 741px) {
    grid-template-areas:
            "content-1 content-2"
            "content-3 content-4";
    max-width: 80%;
    max-height: 60%;
  }
  @media (min-width: 324px) and (max-width: 740px){
    grid-template-areas:
            "content-1 content-2"
            "content-3 content-3"
            "content-4 content-4";
    max-width: 50%;
    max-height: 60%;
  }
  @media (min-width: 1024px) {
    grid-template-areas:
            "content-1 content-2"
            "content-3 content-4";
    max-width: 50%;
    max-height: 60%;
  }
  grid-template-rows: 0.35fr 0.4fr;
  grid-template-columns: 0.5fr 0.5fr;
  /*height: 80%;*/
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #171616;
  height: 40%;
  font-weight: normal;
`

export const Main = () => {
    const [info, setInfo] = useState([]);
    const [userRole, setUserRole] = useState({});
    const navigate = useNavigate();
    const handleShopNavigate = () => navigate('/shop');
    const handleNewsNavigate = () => navigate('/news');
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#shop"),
            animationData: shop_icon,
            name:"animationOne",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#chat"),
            animationData: conversation,
            name:"animationTwo",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#hero"),
            animationData: developer,
            name:"animationThree",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#event"),
            animationData: event,
            name:"animationFour",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#news"),
            animationData: news,
            name:"animationFive",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#rules"),
            animationData: rules,
            name:"animationSix",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#rate"),
            animationData: rate,
            name:"animationSeven",
            autoplay: false,
            loop: true,
        })



    }, []);
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setInfo(response.data);
    },[])
    useEffect( ()=>{
        setUserRole(info.role);
        console.log(userRole);
    },[info, userRole])

return (
    <div className='wrapper_main'>
        <S.Nav>
            <div>
                <S.NavLink to='/main'>
                    <img className="logoImage" src={Logotype} alt='logo'/>
                </S.NavLink>
            </div>
            <SideNav>
                {((info?.role?.roleId) == '2') &&
                <S.NavLink to='/admin'>
                    <AdminPanelSettingsIcon/>
                    <span style={{'margin-left': 0}}>Админ</span>
                </S.NavLink>
                }
                <S.NavLink to='/profile'>
                    <AccountCircleIcon/>
                    <span>{info.email}</span>
                </S.NavLink>
                <S.NavLink onClick={() => localStorage.clear()} to="/login"><S.GlassBtn><S.InlineSpan><FontAwesomeIcon icon={faUserAstronaut}/></S.InlineSpan><S.InlineSpan>Выйти</S.InlineSpan></S.GlassBtn></S.NavLink>
            </SideNav>
        </S.Nav>
    <Container>
        <section className="content-1">
            <div className="hero_block">
                <div className="hero_title"><p>Сотрудник месяца</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationThree")}
                           onMouseLeave={() => lottie.pause("animationThree")}
                           className="hero_img_block category_img" id="hero"></CardImage>
            </div>
        </section>
        <section className="content-2">
            <section className="shop_block" onClick={handleShopNavigate}>
                <div className="shop_title"><p>Магазин</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationOne")}
                           onMouseLeave={() => lottie.pause("animationOne")}
                           className="shop_img_block category_img" id="shop"></CardImage>
            </section>
            <section className="news_block" onClick={handleNewsNavigate}>
                <div className="news_title"><p>Новости</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationFive")}
                           onMouseLeave={() => lottie.pause("animationFive")}
                           className="news_img_block category_img" id="news"></CardImage>
            </section>
        </section>
        <section className="content-3">
            <section className="rate_block">
                <div className="rate_title"><p>Рейтинг</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationSeven")}
                           onMouseLeave={() => lottie.pause("animationSeven")}
                           className="rate_img_block category_img" id="rate"></CardImage>
            </section>
            <section className="calendar_block">
                <div className="calendar_title"><p>Мероприятия</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationFour")}
                           onMouseLeave={() => lottie.pause("animationFour")}
                           className="calendar_img_block category_img" id="event"></CardImage>
            </section>
        </section>
        <section className="content-4">
            <section className="chat_block">
                <div className="chat_title"><p>Чат c администрацией</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationTwo")}
                           onMouseLeave={() => lottie.pause("animationTwo")}
                           className="chat_img_block category_img" id="chat"></CardImage>
                {/*<div className="chat_img_block"><img className="category_img" src={tomka_1} alt="Изображение"/></div>*/}
        </section>
            <section className="rules_block">
                <div className="rules_title"> <p>Правила портала</p></div>
                <CardImage onMouseEnter={() => lottie.play("animationSix")}
                           onMouseLeave={() => lottie.pause("animationSix")}
                           className="rules_img_block category_img" id="rules"></CardImage>
            </section>
        </section>

    </Container>
    </div>
)
}
