import React from "react";
import AddProduct from "@/comps/Products/Products";
import { ProductCard } from "@/comps/Products/ProductsCards";

const AddProd = () => {
    return (
        <>
        <h1 style={{paddingTop:"150px"}}>Here is the Products List</h1>
            <ProductCard />
        </>
    );
}

export default AddProd;