import React, {useEffect, useState, useRef} from 'react';
import $ from 'jquery';
import axios from "../../api/axios";
import Carousel from "./Carousel";
import * as S from "../Navigation/NavbarElements";
import Logotype from "../../images/Logotype.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import styled from "styled-components";

export const SideNav = styled.div`
  display: flex;
  flex-direction: row;
`;

export const News = () => {
    const [news,setNews] = useState({});
    const [info, setInfo] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        // console.log(response.data.userBalance);
        setInfo(response.data);
        // console.log('РОЛЬ111',response.data.roleId)
        console.log(response.data);
        // console.log('РОЛЬ',role);
    },[])
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/posts',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setNews(response.data);
        console.log(response.data);
    },[])
    let arr = [];
    console.log('11111', news);
    for (let key in news) {
        arr.push(news[key]);
    }
    console.log('222', arr[0]);
    const Ticker = () => {
        const tickerRef = useRef(null);

        useEffect(() => {
            const tickerLength = $('.carousel-inner-data ul li').length;
            const tickerHeight = $('.carousel-inner-data ul li').outerHeight();

            $('.carousel-inner-data ul li:last-child').prependTo('.carousel-inner-data ul');
            $('.carousel-inner-data ul').css('marginTop', -tickerHeight);

            function moveTop() {
                $('.carousel-inner-data ul').animate(
                    {
                        top: -tickerHeight,
                    },
                    600,
                    function () {
                        $('.carousel-inner-data ul li:first-child').appendTo('.carousel-inner-data ul');
                        $('.carousel-inner-data ul').css('top', '');
                    }
                );
            }

            const intervalId = setInterval(() => {
                moveTop();
            }, 3000);

            return () => clearInterval(intervalId);
        }, []);

        return <div ref={tickerRef} className="carousel-inner-data"></div>;
    }
    Ticker();

    return (
        <div>
            <S.Nav>
                <div>
                    <S.NavLink to='/main'>
                        <img className="logoImage" src={Logotype} alt='logo'/>
                    </S.NavLink>
                </div>
                {/*<div>*/}
                {/*    <S.NavLink to='/profile'>*/}
                {/*        <AccountCircleIcon/>*/}
                {/*    </S.NavLink>*/}
                {/*</div>*/}
                <SideNav>
                    <S.NavLink to='/profile'>
                        <AccountCircleIcon/>
                        <span>{info.email}</span>
                    </S.NavLink>
                    <S.NavLink onClick={() => localStorage.clear()} to="/login"><S.GlassBtn><S.InlineSpan><FontAwesomeIcon icon={faUserAstronaut}/></S.InlineSpan><S.InlineSpan>Выйти</S.InlineSpan></S.GlassBtn></S.NavLink>
                </SideNav>
            </S.Nav>
            <Carousel/>
            {/*{arr.map((post) =>*/}
            {/*    <div>*/}
            {/*        <div>{post.title}</div>*/}
            {/*        <div>{post.text}</div>*/}
            {/*        <img style={{width: '320px'}} src={post.image?.imageUrl}/>*/}
            {/*    </div>*/}

            {/*)}*/}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 sidebar-page-container">
                            <div className="sidebar">
                                <div className="sidebar-widget sidebar-post">
                                    <div className="widget-title">
                                        <h3>Новости</h3>
                                    </div>
                                    <div className="post-inner">
                                        <div className="carousel-inner-data">
                                            <ul>
                                                <li>
                                                    <div className="post">
                                                        <div className="post-date"><p>05</p><span>Мая</span></div>
                                                        <div className="file-box"><i className="far fa-folder-open"></i>
                                                            <p>{arr[0]?.title}</p></div>
                                                        <h5><a href="#">Lorem Ipsum is simply dummy text of the printing
                                                            and typesetting industry.</a></h5>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="post">
                                                        <div className="post-date"><p>07</p><span>Января</span></div>
                                                        <div className="file-box"><i className="far fa-folder-open"></i>
                                                            <p>{arr[1]?.title}</p></div>
                                                        <h5><a href="#">Lorem Ipsum is simply dummy text of the printing
                                                            and typesetting industry.</a></h5>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="post">
                                                        <div className="post-date"><p>08</p><span>Августа</span></div>
                                                        <div className="file-box"><i className="far fa-folder-open"></i>
                                                            <p>{arr[2]?.title}</p></div>
                                                        <h5><a href="#">Lorem Ipsum is simply dummy text of the printing
                                                            and typesetting industry.</a></h5>
                                                    </div>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <div className="post">*/}
                                                {/*        <div className="post-date"><p>06</p><span>July</span></div>*/}
                                                {/*        <div className="file-box"><i className="far fa-folder-open"></i>*/}
                                                {/*            <p>Subject</p></div>*/}
                                                {/*        <h5><a href="#">Lorem Ipsum is simply dummy text of the printing*/}
                                                {/*            and typesetting industry.</a></h5>*/}
                                                {/*    </div>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}