import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";

export const News = () => {
    const [news,setNews] = useState({});
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

    return (
        <div>
            <h1>Новости</h1>
            {arr.map((post) =>
                <div>
                    <div>{post.title}</div>
                    <div>{post.text}</div>
                    <img style={{width: '320px'}} src={post.image?.imageUrl}/>
                </div>

            )}
        </div>
    )
}