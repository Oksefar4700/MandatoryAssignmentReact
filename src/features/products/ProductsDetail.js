import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../app/productsApi';

function ProductDetail() {
    const { productId } = useParams(); 
    const { data: product, isLoading, error } = useGetProductQuery(productId); 

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product: {error.message}</div>;
    if (!product) return <div>Product not found</div>;

    // Viser produktinformation
    return (
        <div className="product-detail">
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
        </div>
    );
}

export default ProductDetail;
