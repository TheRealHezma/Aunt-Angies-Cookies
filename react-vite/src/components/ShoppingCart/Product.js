import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice'; // Import the action

function Product({ product }) {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItem(product)); // Dispatch the addItem action with the product data
    };

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Product;
