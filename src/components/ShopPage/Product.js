import {
    Add,
    FavoriteBorderOutlined, Remove,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {Modal} from "./Modal";
import {addProduct, removeProduct} from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 50;
  border-radius: 15px;
  //backdrop-filter: blur(30px);
  position: relative;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  max-height: 200px;
  max-width: 100%;
  border-radius: 10px;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  font-size: 16px;
  margin: 5px;
  font-weight: normal;
`;

const Desc = styled.p`
  font-size: 14px;
  text-align: center;
  margin: 10px;
`;

const Button = styled.button`
  
`;
const InfoContainer = styled.div`
  color: black;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  max-height: 40%;
 
`;
const ImgContainer = styled.div`
 justify-items: center;
  align-items: center;
display: flex;
  flex-direction: column;
  max-height: 60%;
  padding: 0.5em;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export const Product = ({ item }) => {


    const [modalActive, setModalActive] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();


    useEffect(async ()=>{
        const response=await axios.get(`/common/products/${item.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                    'Access-Control-Allow-Origin': 'http://localhost:8080'
                },
                withCredentials: false,
                mode: 'no-cors',
            })
        console.log("Product",response.data)
        setProduct(response.data);
    },[item])
    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 0 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
        return quantity;
    };
    const handleAdd = () => {
        dispatch(
            addProduct({...product, quantity })
        );
        setModalActive(false);
    };
    const handleRemove = () => {
        if (quantity>0) {
            dispatch(
                removeProduct({...product, quantity})
            );
        }
        else {
            alert('Нечего удалять');
        }
    };

    return (
        <Container>
            <Wrapper>
                <ImgContainer>
                    <div><Image alt='товар' onClick={() => setModalActive(true)} src={item.image?.imageUrl}/></div>
                </ImgContainer>
                <InfoContainer>
                    <div>
                        <Title>{item.name}</Title>
                        <Desc>{item.price}🪙</Desc>
                    </div>
                    <div>
                        <Button onClick={setModalActive} className='custom-btn'>Купить</Button>
                    </div>
                </InfoContainer>

                <Modal active={modalActive} setActive={setModalActive}>
                    <Container>
                        <Wrapper>
                            <ImgContainer>
                                <Image src={product?.image?.imageUrl}/>
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{product.name}</Title>
                                <AmountContainer>
                                    <Remove onClick={() => handleQuantity("dec")} />
                                    <Amount>{quantity}</Amount>
                                    <Add onClick={() => handleQuantity("inc")} />
                                </AmountContainer>
                                <Desc>
                                    <div>{product.description}</div>
                                    <div>{product.price}🪙</div>
                                    <div>Осталось: {product.amount} шт</div>
                                </Desc>
                                <div>
                                    <Button onClick={handleAdd} className='custom-btn'>Купить</Button>
                                </div>
                            </InfoContainer>
                        </Wrapper>
                    </Container>
                </Modal>

            </Wrapper>
        </Container>
    );
};

export default Product;