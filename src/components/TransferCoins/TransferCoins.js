import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBagShopping, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../ShopPage/Modal";
import {Add, Remove} from "@mui/icons-material";
import Navbar from "../Navigation/Navbar";
import Logotype from "../../images/Logotype.svg";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {NavLink} from "../../components/Navigation/NavbarElements";
import Box from '@mui/material/Box';
import tomka from '../../images/tomka-1.png'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SendIcon from '@mui/icons-material/Send';

import '../../bootstrap/bootstrap.css';

const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: black;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Order = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(30px);
  margin: 1em;
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
const Header = styled.div`
  margin: 20px 40px;
`;
const CustomBtn = styled.button`
  padding: 5px;
  background-color: #F57838;
  border-radius: 5px;
  border-width: thin;
  margin: 10px;
  font-weight: 300;
`;

export const TransferCoins = () => {
    const [usersInfo, setUsersInfo] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [customId, setCustomId] = useState('');
    const [customCaption, setCustomCaption] = useState('');
    const [balance, setBalance] = useState('0');
    const [customCause, setCustomCause] = useState('Сообщение');
    const [currentUser, setCurrentUser] = useState(
        {
            userId: '',
            userBalance: 0,
            cause: '',
        }
    )

    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info/all_users',
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
    // const handleTransfer = async() => {
    //     try {
    //         const response = await axios.post('user/transfer',
    //             JSON.stringify(currentUser),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //             }
    //         );
    //         console.log('response data',response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    useEffect( async ()=>{
        try {
            const response =  await axios.post('user/transfer',
                JSON.stringify(currentUser),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                }
            );
        } catch (err) {
            console.log(err);
        }
    },[currentUser])
    return (
        <div className='wrapper_main'>
            <Navbar />
        <Container>
            <Header><h3 style={{fontWeight: '300'}}>Перевести койны другому пользователю</h3></Header>
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
                                <CustomBtn onClick={( (response) => {
                                 setModalActive(true);
                                    setCustomId(user.id);
                                    setCustomCaption(user.email)
                                })} className='btn-outline-secondary'>Перевести койны
                                </CustomBtn>
                            </ProductAmountContainer>
                        </PriceDetail>
                    </Order>
                ))}
            </Info>
            <Modal active={modalActive} setActive={setModalActive}>
                    <Container>
                        <Wrapper>
                            <div>Перевести койны пользователю: <br/><span style={{color: 'orange', marginLeft: '0'}}>{customCaption}</span></div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <MonetizationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="Сумма пополнения" variant="standard"
                                           onChange={(e) => setBalance(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <SendIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    label="Сообщение:"
                                    variant="standard"
                                    className="reason"
                                    onChange={(e) => setCustomCause(e.target.value)}
                                />
                            </Box>
                            <CustomBtn onClick={ () => {
                                setCurrentUser((prevState) => ({
                                ...prevState,
                                userId: customId,
                                    userBalance: +balance,
                                    cause: customCause,
                                }))
                                setModalActive(false);
                            }}>Отправить перевод</CustomBtn>
                        </Wrapper>
                    </Container>
            </Modal>
        </Container>
        </div>
    );
}
