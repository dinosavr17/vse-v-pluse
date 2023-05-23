import styled from "styled-components";
import {Product} from "./Product";
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/common/products',
                    {
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        },
                        withCredentials: false,
                        mode: 'no-cors',
                    }
                );
                console.log(response.data);
                setProducts(response.data);

            } catch (err) {}
        };
        getProducts();
    }, []);

    /*useEffect(() => {
        cat &&
        setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters]);
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]); */

    return (
        <div>
            {products != [] &&
            <Container>
                {products?.map((item) => {
                    return <Product item={item} key={item.id}/>
                })}
            </Container>
            }
            {
                <div>Продукты не загружены</div>
            }
        </div>
    );
};
