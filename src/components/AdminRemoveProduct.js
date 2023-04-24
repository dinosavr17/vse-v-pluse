import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "../api/axios";
import './adminAdd.css'
import { useForm } from 'react-hook-form';
import Product from "./ShopPage/Product";
import AdmNavbar from "./AdmNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

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
const ProductName = styled.span``;


const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const Image = styled.img`
  width: 200px;
`;

export const AdminRemoveProduct = () => {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    useEffect(async ()=>{
            try {
                const response = await axios.get('/products',
                    {
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                            'Access-Control-Allow-Origin': 'http://localhost:8080'
                        },
                        withCredentials: false,
                        mode: 'no-cors',
                    }
                );
                console.log(response.data)
                setProducts(response.data);
            } catch (err) {}
    }, []);
    const handleDeleteProduct = async (event,id) => {
        if (window.confirm('Вы уверены, что хотите удалить товар?')) {
            try {
                await axios.delete(`/admin/product/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:8080',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                        withCredentials: false,
                        mode: 'no-cors',
                    },
                );
            } catch (err) {
            }
            const response = await axios.get('/products');
            console.log(response.data)
            setProducts(response.data);
        }
    };
    return (
        <section className="register_section">
            <AdmNavbar/>
            <div className="card">
                <Container>
                    <Wrapper>
                        <Title>
                            <div>Выгрузить товары и удалить:</div>
                        </Title>
                        <Info>
                            {products.map((product) => (
                              <Order key={product.id}>
                                  <OrderDetail>
                                      <Image src={product?.image?.imageUrl} />
                                      <Details>
                                          <ProductName>
                                              <b>Product:</b> {product.name}
                                          </ProductName>
                                          <ProductId>
                                              <b>ID:</b> {product.id}
                                          </ProductId>
                                          <ProductColor color='black'/>
                                          <ProductSize>
                                              <b>Price:</b> {product.price}🪙
                                          </ProductSize>
                                          <ProductPrice>
                                              <FontAwesomeIcon onClick={(event)=>handleDeleteProduct(event,product.id)} icon={faTrashCan}/>
                                          </ProductPrice>
                                      </Details>
                                  </OrderDetail>
                              </Order>
                            ))}
                        </Info>
                    </Wrapper>
                </Container>
            </div>
        </section>
    )

}
export default AdminRemoveProduct