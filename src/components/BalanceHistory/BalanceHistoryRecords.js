import React, {useEffect, useState} from 'react';
import Navbar from "../Navigation/Navbar";
import axios from "../../api/axios";

export const BalanceHistoryRecords = () => {
    const [balanceRecord, setBalanceRecord] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/balance_change_records',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setBalanceRecord(response.data);
        console.log(response.data);
    },[])
    return (
        <div>
            <Navbar/>
            Транзакции
        </div>
    );
}
