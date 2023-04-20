import React, {Fragment, useEffect, useState} from "react";
import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import axios from "../api/axios";
import {clearCart, removeProduct} from "../redux/cartRedux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

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

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export const Cart = () => {
    const ORDER_URL = 'http://localhost:3000/user/orders';
    const cart = useSelector((state) => state.cart);
    const total = useSelector((state) => state.cart.total);
    const quantity = useSelector((state) => state.cart.quantity);
    const [order, setOrder] = useState('');
    const dispatch = useDispatch();
    useEffect( ()=> {
        const order1 = cart.products.map(product => {
            return (
                {productId:product.id, quantity: product.quantity}
            )
        } )
        setOrder(order1);
    },[cart])
    let orderCreationDetails = {};
    orderCreationDetails= order;
    console.log('массив', orderCreationDetails);
    const handleSubmit = async () => {
        if (window.confirm('Вы действительно хотите закончить покупки?')) {
            try {
                console.log(JSON.stringify({orderCreationDetails}));
                const response = await axios.post(ORDER_URL,
                    JSON.stringify({orderCreationDetails}),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
                dispatch(
                    clearCart({...cart})
                );
                console.log(response?.data);
            } catch (err) {
            }
        }
    };
    const handleClear = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(
                clearCart({...cart})
            );
        }
    };
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>Корзина</Title>
                <Top>
                    <TopButton><DeleteOutlineIcon onClick={handleClear}/></TopButton>
                    <TopTexts>
                        <TopText>Корзина(2)</TopText>
                        <TopText>Избранное (0)</TopText>
                    </TopTexts>
                    <TopButton className='custom-btn'>Заплатить</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                                <ProductDetail>
                                    <Image src={product.imageUrl} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.name}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product.id}
                                        </ProductId>
                                        <ProductColor color='black'/>
                                        <ProductSize>
                                            <b>Size:</b> XS
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <ProductAmount>{product.quantity} шт.</ProductAmount>
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        🪙  {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>Сумма</SummaryTitle>
                        <SummaryItem type="total">
                            <SummaryItemText>Итог</SummaryItemText>
                            <SummaryItemPrice>🪙{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={handleSubmit}>Заплатить</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};

export default Cart;