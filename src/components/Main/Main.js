import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import hero_image from '../../images/superhero 1.png';
import shirt_image from '../../images/shopping-cart1.png';
import newspaper_image from '../../images/newspaper 1.png';
import rate_image from '../../images/reviews 1.png'
import calendar_image from '../../images/calendar 1.png'
import chat_image from '../../images/chat_img.png'
import rules_image from '../../images/book 1.png'
import tomka_1 from '../../images/tomka-1.png'
import  lottie from "lottie-web";
import shop_icon from '../../lotties/shop-icon.json'
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

import rule from '../../images/rule.png'
export const Main = () => {
    const navigate = useNavigate();
    const handleShopNavigate = () => navigate('/shop');
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#react-logo"),
            animationData: shop_icon,
            autoplay: true,
        });
    }, []);
return (
    <div className="container">
        <section className="content-1">
            <div className="hero_block">
                <div className="hero_title"><p>Сотрудник месяца</p></div>
                <div className="hero_img_block"><img className="category_img" src={hero_image} alt="Изображение" /></div>
            </div>
        </section>
        <section className="content-2">
            <section className="shop_block" onClick={handleShopNavigate}>
                <div className="shop_title"><p>Магазин</p></div>
                <div className="shop_img_block" id="react-logo" style={{ width: 200, height: 200 }} ></div>
            </section>
            <section className="news_block">
                <div className="news_title"><p>Новости</p></div>
                <div className="news_img_block"><img className="category_img" src={newspaper_image} alt="Изображение"/></div>
            </section>
        </section>
        <section className="content-3">
            <section className="rate_block">
                <div className="rate_title"><p>Рейтинг</p></div>
                <div className="rate_img_block"><img className="category_img" src={rate_image} alt="Изображение"/></div>
            </section>
            <section className="calendar_block">
                <div className="calendar_title"><p>Календарь</p></div>
                <div className="calendar_img_block"><img className="category_img" src={calendar_image} alt="Изображение"/></div>
            </section>
        </section>
        <section className="content-4">
            <section className="chat_block">
                <div className="chat_title"><p>Чат c администрацией</p></div>
                <div className="chat_img_block"><img className="category_img" src={tomka_1} alt="Изображение"/></div>
        </section>
            <section className="rules_block">
                <div className="rules_title"> <p>Правила портала</p></div>
                <div className="rules_img_block"><img className="category_img" src={rule} alt="Изображение"/></div>
            </section>
        </section>

    </div>
)
}
