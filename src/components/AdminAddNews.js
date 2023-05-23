import React from 'react';
import axios from "../api/axios";
import {useForm} from "react-hook-form";
import styled from "styled-components";

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

const AdminAddNews = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        if (window.confirm('Вы уверены, что хотите добавить новость?')) {
            let bodyFormData;
            bodyFormData = new FormData();
            // console.log(data.file[0]);
            data.file = data.file[0];
            // console.log(data.name);
            // console.log(data.price);
            // console.log(data.amount);
            bodyFormData.append('title', data.title);
            bodyFormData.append('text', data.text);
            bodyFormData.append('file', data.file);
            // bodyFormData.append("file", imageBlob, "image.png");
            // for(let [name, value] of bodyFormData) {
            //     alert(`${name} = ${value}`); // key1=value1, потом key2=value2
            // }
            try {
                // console.log(bodyFormData);
                const response = await axios.post('admin/post', bodyFormData,
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
    return (
        <div>
            <StyledFormWrapper>
                <StyledForm  className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <StyledInput type="text" placeholder="Заголовок" {...register("title", {required: true, maxLength: 100})}/>
                        <StyledInput  type="text" placeholder="Контент" {...register("text", {required: true, maxLength: 1000})} />
                        <input type="file" placeholder="file" onChange={onchange} accept=".jpg,.jpeg,.png" {...register("file", {})} />

                        <input className='custom-btn' type="submit" />
                    </div>
                </StyledForm>
                {/*<button onClick={handleClick}>Создать продукт</button>*/}
            </StyledFormWrapper>
        </div>
    );
};

export default AdminAddNews;