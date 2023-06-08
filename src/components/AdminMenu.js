import '../components/LoginPage/login.css';
import {Link, useNavigate, useLocation, NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import lottie from "lottie-web";
import trashBin from "../lotties/trashBin.json";
import edit from "../lotties/edit.json";
import coin from "../lotties/coin.json"
import basket from "../lotties/basket.json"
import box from "../lotties/box.json"
import styled from "styled-components";
import * as S from "./Navigation/NavbarElements";
import Logotype from "../images/Logotype.svg";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {SideNav} from "./Main/Main";
import axios from "../api/axios";

const CardImage = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 150px;
`;
const Card = styled.div`
  cursor: pointer;
  margin: 10px;
`;
const CardLine = styled.div`
  display: flex;
  flex-direction: row;
`;
const CardsMainContainer = styled.div`
  padding: 70px;
`;

const AdminMenu = () => {
    const navigate = useNavigate();
    const handleOrdersNavigate = () => navigate('/adm-orders');
    const handleRemoveNavigate = () => navigate('/remove-product');
    const handleAddProduct = () => navigate('/adm-product');
    const handleBalance = () => navigate('/adm-balance');
    const handleNewsNavigate = () => navigate('/adm-news');
    const [info, setInfo] = useState([]);
    const [userRole, setUserRole] = useState({});
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
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#bin"),
            animationData: trashBin,
            name:"animationOne",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#edit"),
            animationData: edit,
            name:"animationFive",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#coin"),
            animationData: coin,
            name:"animationTwo",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#basket"),
            animationData: basket,
            name:"animationFour",
            autoplay: false,
            loop: true,
        });
        lottie.loadAnimation({
            container: document.querySelector("#box"),
            animationData: box,
            name:"animationThree",
            autoplay: false,
            loop: true,
        });



    }, []);

    return (

        <nav>
            <S.Nav>
                <div>
                    <S.NavLink to='/main'>
                        <img className="logoImage" src={Logotype} alt='logo'/>
                    </S.NavLink>
                </div>
                <SideNav>
                    {/*<S.NavLink to='/admin'>*/}
                    {/*    <AdminPanelSettingsIcon/>*/}
                    {/*    {((info?.role?.roleId) == '2') &&*/}
                    {/*    <span style={{'margin-left': 0}}>Админ</span>*/}
                    {/*    }*/}
                    {/*</S.NavLink>*/}
                    <S.NavLink to='/profile'>
                        <AccountCircleIcon/>
                        {/*<span>{info.email}</span>*/}
                    </S.NavLink>
                    <S.NavLink onClick={() => localStorage.clear()} to="/login"><S.GlassBtn><S.InlineSpan><FontAwesomeIcon icon={faUserAstronaut}/></S.InlineSpan><S.InlineSpan>Выйти</S.InlineSpan></S.GlassBtn></S.NavLink>
                </SideNav>
            </S.Nav>
            <div className="row-cols-md-1 g-4">
                <CardsMainContainer>
                    <div className="row">
                    <Card className="card col" onClick={() => {handleOrdersNavigate()}}>
                        <div className="card-body">
                            <h5 className="card-title">Управление заказами</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <CardImage onMouseEnter={() => lottie.play("animationFour")}
                                       onMouseLeave={() => lottie.pause("animationFour")}
                                       className="hero_img_block category_img" id="basket"></CardImage>

                        </div>
                    </Card>
                    <Card className="card col" onClick={() => {handleRemoveNavigate()}}>
                            <div className="card-body">
                                <h5 className="card-title">Удаление продуктов</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <CardImage onMouseEnter={() => lottie.play("animationOne")}
                                           onMouseLeave={() => lottie.pause("animationOne")}
                                           className="hero_img_block category_img" id="bin"></CardImage>
                            </div>
                    </Card>
                    </div>
                    <div className="row">
                    <Card className="card col" onClick={() => {handleAddProduct()}}>
                            <div className="card-body">
                                <h5 className="card-title">Добавить новый товар</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <CardImage onMouseEnter={() => lottie.play("animationThree")}
                                           onMouseLeave={() => lottie.pause("animationThree")}
                                           className="hero_img_block category_img" id="box"></CardImage>
                            </div>
                    </Card>
                    <Card className="card col" onClick={() => {handleBalance()}}>
                            <div className="card-body">
                                <h5 className="card-title">Управление пользователями</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <CardImage onMouseEnter={() => lottie.play("animationTwo")}
                                           onMouseLeave={() => lottie.pause("animationTwo")}
                                           className="hero_img_block category_img" id="coin"></CardImage>
                            </div>
                    </Card>
                        <Card className="card col" onClick={() => {handleNewsNavigate()}}>
                            <div className="card-body">
                                <h5 className="card-title">Создание новостей</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <CardImage onMouseEnter={() => lottie.play("animationFive")}
                                           onMouseLeave={() => lottie.pause("animationFive")}
                                           className="hero_img_block category_img" id="edit"></CardImage>
                            </div>
                        </Card>
                    </div>
                </CardsMainContainer>
            </div>
            <div className="card-adm">
            {/*<NavLink to='/adm-orders'>*/}
            {/*<div className='adm-card1 adm-card'>*/}
            {/*    <div>Заказы</div>*/}
            {/*    <div>*/}
            {/*        <CardImage onMouseEnter={() => lottie.play("animationFour")}*/}
            {/*                   onMouseLeave={() => lottie.pause("animationFour")}*/}
            {/*                   className="hero_img_block category_img" id="basket"></CardImage>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*</NavLink>*/}
            {/*    <NavLink to='/remove-product'>*/}
            {/*<div className='adm-card2 adm-card'>*/}
            {/*    <div>Удалить продукт</div>*/}
            {/*    <div>*/}
            {/*        <CardImage onMouseEnter={() => lottie.play("animationOne")}*/}
            {/*                   onMouseLeave={() => lottie.pause("animationOne")}*/}
            {/*                   className="hero_img_block category_img" id="bin"></CardImage>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*    </NavLink>*/}
            {/*    <NavLink to='/adm-product'>*/}
            {/*<div className='adm-card3 adm-card'>*/}
            {/*    <div>Добавить товар</div>*/}
            {/*    <div>*/}
            {/*        <CardImage onMouseEnter={() => lottie.play("animationThree")}*/}
            {/*                   onMouseLeave={() => lottie.pause("animationThree")}*/}
            {/*                   className="hero_img_block category_img" id="box"></CardImage>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*    </NavLink>*/}
            {/*    <NavLink to='/adm-balance'>*/}
            {/*    <div className='adm-card4 adm-card'>*/}
            {/*        <div>Баланс Пользователей</div>*/}
            {/*        <div><CardImage onMouseEnter={() => lottie.play("animationTwo")}*/}
            {/*                        onMouseLeave={() => lottie.pause("animationTwo")}*/}
            {/*                        className="hero_img_block category_img" id="coin"></CardImage></div>*/}
            {/*    </div>*/}
            {/*    </NavLink>*/}
            </div>
            </nav>
    )
}

export default AdminMenu