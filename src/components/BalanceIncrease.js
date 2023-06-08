import React, { useState, useEffect } from 'react';
import '../components/LoginPage/login.css';
import axios from "../api/axios";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserShield, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import AdmNavbar from "./AdmNavbar";

const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Info = styled.div`
  flex: 3;
  
`;
const Order = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(30px);
  margin: 1em;
  border-radius: 10px;
`;
const OrderDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Section = styled.div`
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CreationDate = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const BalanceIncrease = () => {
    const [users,setUsers] = useState({});
    const [finalBalance,setFinalBalance] = useState({});

    const [balance, setBalance] = useState({});
    const [id,setId] = useState({});
    const changeValue = (event) => {
        setBalance({...balance, [event.target.name]:event.target.value})
        setId({...id, userId:event.target.id})
    }
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info/all_users',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setUsers(response.data);
        console.log(response.data);
    },[])
    let userArray = [];
    const result = Object.keys(users).map(key => {
        // console.log(key); // 👉️ name, country
        // console.log(users[key]); // 👉️ James, Chile
        userArray = users[key];
        return {[key]: users[key]};
    });
    console.log('Ага',userArray);
    const handleIncrease = async (event, userId) => {
        if (window.confirm('Вы уверены, что хотите изменить баланс юзера?')) {
            // setBalance({...balance, [event.target.name]:event.target.value})
            console.log('лог',);
            const preUserBalance = balance[userId];
            console.log('Баланс', preUserBalance);
            let userBalance = Number(preUserBalance);
            let cause = 'Причина изменения баланса.'
            let profile = {};
            profile = {...id, userBalance, cause};
            console.log(profile);
            try {
                console.log(JSON.stringify(profile));
                const response = await axios.post('/admin/user_balance',
                    JSON.stringify(profile),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
                console.log(response?.data);
            } catch (err) {
            }
        }
    }
    const handleDelete = async (event,userId) => {
        if (window.confirm('Вы уверены, что хотите удалить юзера?')) {
            try {
                await axios.delete(`/admin/${userId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
            } catch (err) {
            }
            const response = await axios.get(
                '/common/info/all_users',
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                    },
                }
            );
            setUsers(response.data);
        }
    };
    return (
        <Section>
            <AdmNavbar/>
            <div className="card" style={{
                background: "linear-gradient(180deg, #FEA3A4, #F88B15)"}}>
                <Container>
                    <Wrapper>
                        <Title>
                            <div>Пользователи:</div>
                        </Title>
                        <Info>
                            {userArray.map((user) => (
                                <Order key={user.id}>
                                    <OrderDetail>
                                        <Details>
                                            <CreationDate>
                                                <b>Email: {user.email}</b>
                                            </CreationDate>
                                        </Details>
                                    </OrderDetail>
                                    <PriceDetail>
                                        Баланс:
                                        <ProductAmountContainer>
                                            {user.userBalance}🪙
                                        </ProductAmountContainer>
                                            <input key={user.id}
                                                   type="text"
                                                   id={user.id}
                                                   required
                                                   onChange={changeValue}
                                                   value={balance[user.id]||''}
                                                   name={user.id}
                                            />
                                            <button onClick={(event)=>handleIncrease(event,user.id)} className="login_btn">Изменить баланс</button>
                                        <div><FontAwesomeIcon onClick={(event)=>handleDelete(event,user.id)} icon={faUserXmark}/></div>
                                    </PriceDetail>
                                </Order>
                            ))}
                        </Info>
                    </Wrapper>
                </Container>
            </div>
        </Section>
    )
}

export default BalanceIncrease