import React, { useState, useEffect } from 'react';
import './login.css';
import {NavLink} from 'react-router-dom';
import styled from "styled-components";
import {mobile} from "../responsive";
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;
const StyledButton = styled.button`
`;
const Wrapper = styled.div`
  padding: 1em;
  ${mobile({ padding: "10px" })}
  display: flex;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin: 0.5em;
`;

const CreateProduct = () => {
    return (
        <section className="login_section">
            <div className="card">
                <Container>
                    <Wrapper>
                        <Title>
                            <div>Товары:</div>
                        </Title>
                        <Title>
                                        <NavLink to='/adm-add'>
                                    <StyledButton className='custom-btn'>Добавить товар</StyledButton>
                                        </NavLink>
                        </Title>
                    <Title>
                                    <NavLink to='/adm-remove'>
                                    <StyledButton className='custom-btn'>
                                        Управлять товарами
                                </StyledButton>
                                        </NavLink>
                    </Title>
                    </Wrapper>
                </Container>
            </div>
        </section>
    )
}

export default CreateProduct