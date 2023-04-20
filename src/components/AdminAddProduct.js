import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle, css} from "styled-components";
import axios from "../api/axios";
import {mobile} from "../responsive";
import './adminAdd.css'
import AdmNavbar from "./AdmNavbar";
import { useForm } from 'react-hook-form';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    margin: 0;
    color: #555;
  }
  label {
    cursor: pointer;
   color: #f7797d;
  }

  #upload-photo {
    padding: 5px;
    opacity: 25;
    z-index: 1;
  }
`;
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Info = styled.div`
    display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;
const StyledInput = styled.input`
  display: flex;
  width: 100%;
  ${sharedStyles}
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
  
`;

export const AdminAddProduct = () => {
    const [product, setProduct] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        if (window.confirm('Вы уверены, что хотите добавить товар?')) {
            let bodyFormData;
            bodyFormData = new FormData();
            // console.log(data.file[0]);
            data.file = data.file[0];
            // console.log(data.name);
            // console.log(data.price);
            // console.log(data.amount);
            bodyFormData.append('name', data.name);
            bodyFormData.append('price', data.price);
            bodyFormData.append('description', data.description);
            bodyFormData.append('amount', data.amount);
            bodyFormData.append('file', data.file);
            // bodyFormData.append("file", imageBlob, "image.png");
            // for(let [name, value] of bodyFormData) {
            //     alert(`${name} = ${value}`); // key1=value1, потом key2=value2
            // }
            try {
                // console.log(bodyFormData);
                const response = await axios.post('http://localhost:3000/admin/product', bodyFormData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
                console.log(response?.data);
            } catch (err) {
            }
        }
    };
    const OnChange = (e) =>{
        const file = e.target.files[0];
    }
    console.log(errors);
    // const handleClick = async () => {
    //     try {
    //         console.log(bodyFormData);
    //         const response = await axios.post('http://localhost:3000/admin/product', bodyFormData,
    //             {
    //                 headers: {
    //                     'Content-Type':  "multipart/form-data",
    //                     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //                     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
    //                 },
    //             },
    //         );
    //         console.log(response?.data);
    //     } catch (err) {}
    // };
    return (
                <Container className='order_section'>
                    <AdmNavbar/>
                    <>
                        <GlobalStyle/>
                    <Wrapper >
                        <Title>Добавить новый товар:
                        </Title>
                        <Info>
                            <StyledFormWrapper>
                            <StyledForm  class="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">

                                <StyledInput type="text" placeholder="Название товара" {...register("name", {required: true, maxLength: 80})} />
                                <StyledInput type="text" placeholder="Цена" {...register("price", {required: true, maxLength: 100})} />
                                <StyledInput  type="text" placeholder="Описание" {...register("description", {required: true, maxLength: 1000})} />
                                <StyledInput  type="text" placeholder="Количество" {...register("amount", {})} />
                                <input type="file" placeholder="file" onChange={onchange} accept=".jpg,.jpeg,.png" {...register("file", {})} />

                                <input className='custom-btn' type="submit" />
                                </div>
                            </StyledForm>
                            {/*<button onClick={handleClick}>Создать продукт</button>*/}
                            </StyledFormWrapper>
                        </Info>
                    </Wrapper>
                        </>
                </Container>
    )

}
export default AdminAddProduct