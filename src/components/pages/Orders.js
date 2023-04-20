import React from "react";
import Navbar from "../components/Navbar";
import {OrderHistory} from "../components/OrderHistory";
import {OrderDetails} from "../components/OrderDetails";
export const Orders = () => {
    return (
        <div>
        <Navbar/>
            <OrderHistory/>
        </div>
    )

}