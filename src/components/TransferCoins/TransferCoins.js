import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserXmark} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../ShopPage/Modal";
import {Add, Remove} from "@mui/icons-material";

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
const Info = styled.div`
  flex: 3;
`;

export const TransferCoins = () => {
    const [usersInfo, setUsersInfo] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [id, setId] = useState('');
    const [balance, setBalance] = useState('0');
    const [cause, setCause] = useState('Сообщение пользователя');
    const [currentUser, setCurrentUser] = useState(
        {
            userId: '',
            userBalance: 0,
            cause: '',
        }
    )

    useEffect(async ()=>{
        const response=await axios.get(
            '/info/all_users',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setUsersInfo(response.data);
        console.log(response.data);
    },[])

    let userArray = [];
    const result = Object.keys(usersInfo).map(key => {
        userArray = usersInfo[key];
        return {[key]: usersInfo[key]};
    });
    // const transferSomething = () => {
    //     setCurrentUser((prevState) => ({
    //         ...prevState,
    //         userBalance: balance,
    //         cause: cause,
    //     }));
    //
    // }
    const handleTransfer = () => {
        setCurrentUser((prevState) => ({
            ...prevState,
            userBalance: balance,
            cause: cause,
        }));
    }
    useEffect(async ()=>{
        try {
            const response = await axios.post('user/transfer',
                JSON.stringify(currentUser),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8080' },
                }
            );
            console.log('response data',response.data);
        } catch (err) {
            console.log(err);
        }
    },[currentUser])
    return (
        <Container>
            <h1>Перевести койны другому пользователю</h1>
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
                            <ProductAmountContainer>
                                <button onClick={( (response) => {
                                 setId(user.email);
                                 setModalActive(true);
                                    setCurrentUser((prevState) => ({
                                        ...prevState,
                                        userId: user.id,
                                    }));
                                })} className='btn-outline-secondary'>Перевести койны</button>
                            </ProductAmountContainer>
                        </PriceDetail>
                    </Order>
                ))}
            </Info>
            <Modal active={modalActive} setActive={setModalActive}>
                    <Container>
                        <Wrapper>
                            <div>{currentUser.userId}</div>
                            <input
                                className="balance"
                                   placeholder="Сумма пополнения"
                                   type="text"
                                   id="text"
                                   onChange={(e) => setBalance(e.target.value)}
                                   value={balance}
                                   required
                            />
                            <input
                                className="reason"
                                   placeholder="Сообщение пользователю"
                                   type="text"
                                   id="text"
                                   onChange={(e) => setCause(e.target.value)}
                                   value={cause}
                                   required
                            />
                            <button onClick={handleTransfer}>Отправить перевод</button>
                        </Wrapper>
                    </Container>
            </Modal>
        </Container>
    );
}
