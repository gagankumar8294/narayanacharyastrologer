import React from "react";
import { ProductCard } from "@/comps/Products/ProductsCards";

const ProductListPage = () => {
    return (
        <>
        <h1 style={{paddingTop:"150px"}}>ProductCard List</h1>
            <ProductCard />
        </>
    );
};

export default ProductListPage; // Ensure you have a default export
