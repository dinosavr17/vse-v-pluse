import React, {useEffect, useState} from "react";
import "./Carousel.css";
import { images } from "./CarouselData";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import styled from "styled-components";
import axios from "../../api/axios";
const Header = styled.h1`
    font-size: 40px;
    background-color: rgb(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 9px;
`
const Parapraph = styled.p`
    font-size: 2rem;
    background-color: rgb(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 9px;
`

function Carousel() {
    const [currImg, setCurrImg] = useState(0);
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
    return (
        <div className="carousel">
            <div
                className="carouselInner"
                style={{ backgroundImage: `url(${arr[currImg]?.image.imageUrl})` }}
            >
                <div
                    className="left"
                    onClick={() => {
                        currImg > 0 && setCurrImg(currImg - 1);
                    }}
                >
                    <ArrowBackIosIcon style={{ fontSize: 30 }} />
                </div>
                <div className="center">
                    <Header>{arr[currImg]?.title}</Header>
                    <Parapraph>{arr[currImg]?.text}</Parapraph>
                </div>
                <div
                    className="right"
                    onClick={() => {
                        if (currImg < arr.length - 1) {
                            setCurrImg(currImg+1);
                        }
                        else {
                            setCurrImg(0);
                        }
                    }}
                >
                    <ArrowForwardIosIcon style={{ fontSize: 30 }} />
                </div>
            </div>
        </div>
    );
}

export default Carousel;