import React, { useState, useEffect } from 'react';
import './login.css';
import axios from "../api/axios";
import styled from "styled-components";
import {mobile} from "../responsive";
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
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
  ${mobile({flexDirection: "column"})}
  background-color: #a7e1d1;
  margin: 1em;
  border-radius: 10px;
`;
const OrderDetail = styled.div`
  flex: 2;
  display: flex;
`;

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
  ${mobile({ marginBottom: "20px" })}
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const ControlingOrders = () => {
    const [adminOrders,setAdminOrders] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            'http://localhost:3000/admin/orders',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setAdminOrders(response.data);
        console.log('Получаем все заказы',response.data);
    },[])
    let singleOrderArray = [];
    const result = Object.keys(adminOrders).map(key => {
        // console.log(key); // 👉️ name, country
        // console.log(users[key]); // 👉️ James, Chile
        singleOrderArray.push(adminOrders[key]);
        return {[key]: adminOrders[key]};
    });
    console.log(result);
    console.log(singleOrderArray);
    let index;
    let permittedValues = [];
    permittedValues = singleOrderArray.map(value => value.id);
    console.log(permittedValues);

    // console.log('Ага',userArray);
    const handleChange = async (event, id, status) => {
        await axios.get(
            'http://localhost:3000/admin/orders',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
                params: {
                    orderId: id,
                    status: status
                }
            }
        );
        const response=await axios.get(
            'http://localhost:3000/admin/orders',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setAdminOrders(response.data);
        console.log('изменение статуса заказа',response.data);
    }

    const handleRemove = async (event, id) => {
        if (window.confirm('Вы уверены, что хотите удалить информацию о заказе'))
        {
            await axios.get(
                'http://localhost:3000/admin/orders',
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                    },
                    params: {
                        orderId: id,
                    }
                }
            );
            const response = await axios.get(
                'http://localhost:3000/admin/orders',
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                    },
                }
            );
            setAdminOrders(response.data);
            console.log('удаление заказа', response.data);
        }
    }
    // console.log('Ага',userArray);
    // const handleClick = async (event, userId) => {
    //     // setBalance({...balance, [event.target.name]:event.target.value})
    //     console.log('лог',);
    //     const preUserBalance = balance[userId];
    //     console.log('Баланс', preUserBalance);
    //     let userBalance = Number(preUserBalance);
    //     let profile = {};
    //     profile = {...id,userBalance};
    //     console.log(profile);
    //     try {
    //         console.log(JSON.stringify(profile));
    //         const response = await axios.post('http://localhost:3000/admin/user_balance',
    //             JSON.stringify(profile),
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //                     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
    //                 },
    //             },
    //         );
    //         console.log(response?.data);
    //     } catch (err) {}
    // };
    return (
        <section className="login_section">
            <div className="card">
                <Container>
                    <Wrapper>
                        <Title>
                            <div>ЗАКАЗЫ:</div>
                        </Title>
                        <Info>
                            {singleOrderArray.map((order)=> (
                                <Order key={order.id}>

                                    <OrderDetail>
                                        <Details>
                                                <b>ID заказа: {order.id}</b>
                                            <p>Юзер: {order.userId}</p>
                                            <p>Дата создания: {order.creationDate}</p>
                                            <p>Дата доставки: {order.shippingDate}</p>
                                            <p>Дата закрытия: {order.completionDate}</p>
                                            <p>Сумма заказа: {order.total}🪙</p>
                                        </Details>
                                    </OrderDetail>
                                    <PriceDetail key={order.id}>
                                        <button onClick={(event)=>handleRemove(event,order.id)} className="login_btn">Удалить</button>
                                        {/*<input key={user.uuid}*/}
                                        {/*       type="text"*/}
                                        {/*       id={user.uuid}*/}
                                        {/*       required*/}
                                        {/*       onChange={changeValue}*/}
                                        {/*       value={balance[user.uuid]||''}*/}
                                        {/*       name={user.uuid}*/}
                                        {/*/>*/}
                                        <label htmlFor="orderStatus">Выберите статус заказа:</label>
                                        <select onChange={(event)=>handleChange(event,order.id, event.target.value)} id="orderStatus">
                                            <option value="CREATED">Создан</option>
                                            <option value="SHIPPED">Передан в доставку</option>
                                            <option value="COMPLETED">Доставлен</option>
                                        </select>
                                    </PriceDetail>
                                </Order>
                            ))}
                        </Info>
                    </Wrapper>
                </Container>
            </div>
        </section>
    )
}

export default ControlingOrders