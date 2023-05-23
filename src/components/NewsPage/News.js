import React, {useEffect, useState, useRef} from 'react';
import $ from 'jquery';
import axios from "../../api/axios";
import Carousel from "./Carousel";

export const News = () => {
    const [news,setNews] = useState({});
    useEffect(async ()=>{
        const response=await axios.get(
            'http://localhost:8081/posts',
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