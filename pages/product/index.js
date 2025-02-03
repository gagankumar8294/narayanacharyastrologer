import React from "react";
import { ProductCard } from "@/comps/Products/ProductsCards";

const ListProduct = () => {
    return (
        <>
        <h1 style={{paddingTop:"150px"}}>Here is the Products List</h1>
            <ProductCard />
        </>
    );
}

export default ListProduct;