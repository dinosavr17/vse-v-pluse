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
        <div className="chat_block"></div>
        <div className="content-1">
            <div className="hero_block">
                <p>Сотрудник месяца</p>
            <img src={hero_image}/>
            {/*    <img src="images/W2.png"/>*/}
            </div>
        </div>
        <div className="content-2">
            <div className="shop_block">
                <p>Магазин</p>
            <img src={shirt_image}/>
            </div>
            <div className="news_block">
                <p>Новости</p>
            <img src={newspaper_image}/>
            </div>
        </div>
        <div className="content-3">
            <div className="rate_block">
                <p>Рейтинг</p>
            <img src={rate_image}/>
            </div>
            <div className="calendar_block">
                <p>Календарь</p>
            <img src={calendar_image}/>
            </div>
        </div>
        <div className="content-4">
            <div className="chat_block">
                <p>Чат</p>
            <img src={chat_image}/>
        </div>
            <div className="rules_block">
            <p>Правила портала</p>
            <img src={rules_image}/>
            </div>
        </div>
    </div>
)
}
