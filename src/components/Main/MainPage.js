import React from 'react';
import './MainPage.css';

export const MainPage = () => {
return (
    <div className="container">
        <header className="header">
            <div className="nav-area1">
                <img className="logo" src="./images/Group%201.png" alt=""/>
            </div>
            <div>
                <input className="inp" type="text" placeholder="&#xF002; Search store"/>
            </div>
            <nav>
                <ul className="nav-area">
                    <li><a href="#">products</a></li>
                    <li><a href="#">story</a></li>
                    <li><a href="#">manufacturing</a></li>
                    <li><a href="#">packaging</a></li>
                    {/*<li><img className="icons" src="images/basket.png"/></li>*/}
                    {/*<li><img className="icons" src="images/user.png"/></li>*/}
                </ul>
            </nav>
        </header>
        <aside className="sidebar">
            <ul>
                <li><h1>Explore</h1></li>
                <li><a href="#">&#9889;New in</a></li>
                <li><a href="#">&#129509;Clothing</a></li>
                <li><a href="#">&#128094;Shoes</a></li>
                <li><a href="#">&#128188;Accessories</a></li>
                <li><a href="#">&#129336;Activewear</a></li>
                <li><a href="#">&#127873;Gifts&Living</a></li>
                <li><a href="#">&#128142;Inspiration</a></li>
            </ul>
        </aside>
        <div className="content-1">
            {/*<img src="images/W1.png"/>*/}
            {/*    <img src="images/W2.png"/>*/}
        </div>
        <div className="content-2">
            {/*<img src="images/W3.png"/>*/}
            {/*    <img src="images/W4.png"/>*/}
        </div>
        <div className="content-3">
            {/*<img src="images/W5.png"/>*/}
            {/*    <img src="images/W6.png"/>*/}
        </div>
        <div className="content-4">
            {/*<img src="images/W7.png"/>*/}
            {/*    <img src="images/W8.png"/>*/}
        </div>
        <footer className="footer">
        </footer>
    </div>
)
}
