import React from 'react';
import './Main.css';
import hero_image from '../../images/superhero 1.png';
import shirt_image from '../../images/image-from-rawpixel-id-6290179-svg 1.png';
import newspaper_image from '../../images/newspaper 1.png';
import rate_image from '../../images/reviews 1.png'
import calendar_image from '../../images/calendar 1.png'
import chat_image from '../../images/chat 1.png'
import rules_image from '../../images/book 1.png'
export const Main = () => {
return (
    <div className="container">
        <div className="content-1">
            <div className="hero_block">
                <div className="hero_title"><p>Сотрудник месяца</p></div>
                <div className="hero_img_block"><img className="category_img" src={hero_image} alt="Изображение" /></div>
            {/*    <img src="images/W2.png"/>*/}
            </div>
        </div>
        <div className="content-2">
            <div className="shop_block">
                <div className="shop_title"><p>Магазин</p></div>
                <div className="shop_img_block"><img className="category_img" src={shirt_image} alt="Изображение"/></div>
            </div>
            <div className="news_block">
                <div className="news_title"><p>Новости</p></div>
                <div className="news_img_block"><img className="category_img" src={newspaper_image} alt="Изображение"/></div>
            </div>
        </div>
        <div className="content-3">
            <div className="rate_block">
                <div className="rate_title"><p>Рейтинг</p></div>
                <div className="rate_img_block"><img className="category_img" src={rate_image} alt="Изображение"/></div>
            </div>
            <div className="calendar_block">
                <div className="calendar_title"><p>Календарь</p></div>
                <div className="calendar_img_block"><img className="category_img" src={calendar_image} alt="Изображение"/></div>
            </div>
        </div>
        <div className="content-4">
            <div className="chat_block">
                <div className="chat_title"><p>Чат c администрацией</p></div>
                <div className="chat_img_block"><img className="category_img" src={chat_image} alt="Изображение"/></div>
        </div>
            <div className="rules_block">
                <div> <p>Правила портала</p></div>
                <div><img className="category_img" src={rules_image} alt="Изображение"/></div>
            </div>
        </div>
    </div>
)
}
