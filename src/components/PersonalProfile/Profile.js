import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
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
`;
export const Profile = callback => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [info, setInfo] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            '/info',
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
            // console.log(data.name);
            // console.log(data.price);
            // console.log(data.amount);
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
                const response = await axios.post('info/change', bodyFormData,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            'Access-Control-Allow-Origin': 'http://localhost:8080',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                    },
                );
                console.log(response?.data);
            } catch (err) {
            }
        }
    };


    return (
        <div>
            <h1>Профиль</h1>
            <div>
                <p>{info?.email}</p>
                <p>{info?.firstName}</p>
                <p>{info?.lastName}</p>
                <img src={info?.image?.imageUrl} style={{width:'320px'}}/>
            </div>
            <StyledFormWrapper>
                <StyledForm  class="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
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
                {/*<button onClick={handleClick}>Создать продукт</button>*/}
            </StyledFormWrapper>

        </div>
    );
}
