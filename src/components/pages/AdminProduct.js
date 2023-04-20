import React, {Fragment} from "react";
import BalanceIncrease from "../components/BalanceIncrease";
import AdmNavbar from "../components/AdmNavbar";
import CreateProduct from "../components/CreateProduct";
export const AdminProduct = () => {
    return (
        <Fragment>
            <AdmNavbar/>
            <CreateProduct/>
        </Fragment>
    )

}