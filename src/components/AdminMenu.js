import '../components/LoginPage/login.css';
import {Link, useNavigate, useLocation, NavLink} from 'react-router-dom';
import React from "react";
import lottie from "lottie-web";
import trashBin from "../lotties/trashBin.json";
import coin from "../lotties/coin.json"
import basket from "../lotties/basket.json"
import box from "../lotties/box.json"
import styled from "styled-components";

const CardImage = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 150px;
`;

const AdminMenu = () => {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#bin"),
            animationData: trashBin,
            name:"animationOne",
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
            <div className="card-adm">
            <NavLink to='/adm-orders'>
            <div className='adm-card1 adm-card'>
                <div>Заказы</div>
                <div>
                    <CardImage onMouseEnter={() => lottie.play("animationFour")}
                               onMouseLeave={() => lottie.pause("animationFour")}
                               className="hero_img_block category_img" id="basket"></CardImage>
                </div>
            </div>
            </NavLink>
                <NavLink to='/remove-product'>
            <div className='adm-card2 adm-card'>
                <div>Удалить продукт</div>
                <div>
                    <CardImage onMouseEnter={() => lottie.play("animationOne")}
                               onMouseLeave={() => lottie.pause("animationOne")}
                               className="hero_img_block category_img" id="bin"></CardImage>
                </div>
            </div>
                </NavLink>
                <NavLink to='/adm-product'>
            <div className='adm-card3 adm-card'>
                <div>Добавить товар</div>
                <div>
                    <CardImage onMouseEnter={() => lottie.play("animationThree")}
                               onMouseLeave={() => lottie.pause("animationThree")}
                               className="hero_img_block category_img" id="box"></CardImage>
                </div>
            </div>
                </NavLink>
                <NavLink to='/adm-balance'>
                <div className='adm-card4 adm-card'>
                    <div>Баланс Пользователей</div>
                    <div><CardImage onMouseEnter={() => lottie.play("animationTwo")}
                                    onMouseLeave={() => lottie.pause("animationTwo")}
                                    className="hero_img_block category_img" id="coin"></CardImage></div>
                </div>
                </NavLink>
            </div>
            </nav>
    )
}

export default AdminMenu