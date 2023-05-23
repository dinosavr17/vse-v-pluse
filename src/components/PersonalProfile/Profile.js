import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import Navbar from "../Navigation/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import {Add, Remove} from "@mui/icons-material";
import {Modal} from "../ShopPage/Modal";
import {addProduct} from "../redux/cartRedux";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  padding: 0 20px;
`;
const InfoProf = styled.div`
margin-top: 80px;
`;
const Container = styled.div`
  //flex: 1;
  margin: 5px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 15px;
  //backdrop-filter: blur(30px);
  position: relative;
`;
const TopBlock = styled.div `
  background-color: #000;
  height:200px;
`;
const ProfileImage = styled.img`
  height: 190px;
  width: 140px;
`;
const ProfileImageContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  width: 50%;
  padding: 40px;
  background-color: transparent;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;
const StyledInput = styled.input`
  display: flex;
  width: 100%;
`;
export const Profile = callback => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [info, setInfo] = useState([]);
    const [Achievements, setAchievements] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        // console.log(response.data.userBalance);
        setInfo(response.data);
        // console.log('РОЛЬ111',response.data.roleId)
        console.log(response.data);
        // console.log('РОЛЬ',role);
    },[])
    useEffect(async ()=>{
        const response=await axios.get(
            '/user/user_badges',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        // console.log(response.data.userBalance);
        setInfo(response.data);
        // console.log('РОЛЬ111',response.data.roleId)
        console.log(response.data);
        // console.log('РОЛЬ',role);
    },[])
    const onSubmit = async (data) => {
        if (window.confirm('Вы уверены, что хотите редактировать профиль?')) {
            let bodyFormData;
            bodyFormData = new FormData();
            // console.log(data.file[0]);
            data.file = data.file[0];
            bodyFormData.append('firstName', data.firstName);
            bodyFormData.append('lastName', data.lastName);
            bodyFormData.append('phoneNumber', data.phoneNumber);
            bodyFormData.append('jobTitle', data.jobTitle);
            bodyFormData.append('infoAbout', data.infoAbout);
            bodyFormData.append('file', data.file);
            // bodyFormData.append("file", imageBlob, "image.png");
            // for(let [name, value] of bodyFormData) {
            //     alert(`${name} = ${value}`); // key1=value1, потом key2=value2
            // }
            try {
                // console.log(bodyFormData);
                const response = await axios.post('/common/info/change', bodyFormData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
                console.log(response?.data);
            } catch (err) {
            }
        }
    };
    const handleAdd = () => {
        setModalActive(true);
    };


    return (
        <Container>
            <Navbar/>
            <section className="h-60 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <TopBlock className="rounded-top text-white d-flex flex-row">
                                    <ProfileImageContainer className="ms-4" style={{width: '150px'}}>
                                        <ProfileImage
                                            src={info?.image?.imageUrl}
                                            alt="Generic placeholder image"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{zIndex: '1'}}/>
                                            <button type="button" className="btn btn-outline-dark" style={{zIndex: '1'}}
                                                    data-mdb-ripple-color="dark"
                                                    onClick={() => {
                                                        setModalActive(true)
                                                        console.log(modalActive);
                                                    }}>
                                               Редактировать профиль
                                            </button>
                                    </ProfileImageContainer>
                                    <InfoProf className="ms-3">
                                        <h5>{info?.firstName} {info?.lastName}</h5>
                                        <p>{info?.email}</p>
                                        <p style={{zIndex: '1'}}>{info?.phoneNumber}</p>
                                    </InfoProf>
                                </TopBlock>
                                <div className="p-4 text-black" style={{backgroundColor: '#f8f9fa'}}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">{info.userBalance}🪙</p>
                                            <p className="small text-muted mb-0">Баланс</p>
                                        </div>
                                        {/*<div>*/}
                                        {/*    <p className="mb-1 h5">478</p>*/}
                                        {/*    <p className="small text-muted mb-0">Following</p>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">Обо мне</p>
                                        <div className="p-4" style={{backgroundColor: '#f8f9fa'}}>
                                            <p className="font-italic mb-1">{info.jobTitle}</p>
                                            {/*<p className="font-italic mb-1">Lives in New York</p>*/}
                                            {/*<p className="font-italic mb-0">Photographer</p>*/}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Мои достижения</p>
                                        <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </div>
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </div>
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal active={modalActive} setActive={setModalActive} style={{zIndex: '9999', backgroundColor: 'transparent'}} prop animation={false}>
                <StyledFormWrapper>
                    <StyledForm  className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">

                            <StyledInput type="text" placeholder="Имя" {...(register("firstName", {
                                required: true,
                                maxLength: 80
                            }))} />
                            <StyledInput type="text" placeholder="Фамилия" {...register("lastName", {required: true, maxLength: 100})} onChange={(e) => {e.target.value}} />
                            <StyledInput  type="text" placeholder="Номер телефона" {...register("phoneNumber", {required: true, maxLength: 1000})} />
                            <StyledInput  type="text" placeholder="Должность" {...register("jobTitle", {})} />
                            <StyledInput  type="text" placeholder="Информация обо мне" {...register("infoAbout", {})}/>
                            <input type="file" placeholder="file" onChange={onchange} accept=".jpg,.jpeg,.png" {...register("file", {})} />

                            <input className='custom-btn' type="submit" />
                        </div>
                    </StyledForm>
                </StyledFormWrapper>
            </Modal>

        </Container>
    );
}
