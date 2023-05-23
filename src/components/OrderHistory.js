import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "../api/axios";
import {OrderDetails} from "./OrderDetails";
import {Modal} from "./ShopPage/Modal";
import Navbar from "./Navigation/Navbar";
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
  background-color: lavender;
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

const CreationDate = styled.span`
`;


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
  font-size: 10px;
  font-weight: 200;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
export const OrderHistory = () => {
    const [modalActive, setModalActive] = useState(false);
    const [orderRecords, setOrderRecords] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            '/user/orders',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setOrderRecords(response.data);
    },[])
    const getDate = (date) => {
        let dateFormated = new Date(date);
        let dayFormated = dateFormated.getDate();
        let monthFormated = dateFormated.getMonth();
        let yearFormated = dateFormated.getFullYear();
        let timeFormated = dateFormated.getHours()+':'+dateFormated.getMinutes();
        let finalDate = dayFormated +'.'+monthFormated+'.'+yearFormated + ' ' +timeFormated;
        return finalDate
    }
    if (orderRecords==[]) {return(<Container>
        <Navbar/>
        <Title>История Заказов:</Title>
    </Container>)}
    return (
       <Container>
           <Navbar/>
           <Wrapper>
               <Title>
                <div>История заказов:</div>
               </Title>
               <Info>
                   {orderRecords?.map((order) => (
                       <Order key={order.id}>
                           <OrderDetail>
                               {/*<Image src={product.imageUrl} />*/}
                               <Details>
                                   <CreationDate>
                                       <b>Дата Создания:</b> {getDate(order.creationDate)}
                                   </CreationDate>
                                   <ProductId>
                                       <b>ID:</b> {order.id}
                                   </ProductId>
                                   <ProductSize>
                                       <b>Сумма Заказа:</b> {order.total}🪙
                                   </ProductSize>
                               </Details>
                           </OrderDetail>
                           <PriceDetail>
                               <ProductPrice>
                                <OrderDetails item={order} />
                               </ProductPrice>
                               <ProductAmountContainer>
                               </ProductAmountContainer>
                           </PriceDetail>
                       </Order>
                   ))}
               </Info>
           </Wrapper>
       </Container>
    )
}