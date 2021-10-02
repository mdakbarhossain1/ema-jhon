import React from 'react';
import './AddToCart.css'
const AddToCart = (props) => {
    const {cart} = props;

    console.log(props);

    // const totalReducer = (previous,current)=> previous+ current.price;
    // const productTotal = cart.reduce(totalReducer,0)
    let totalQuantity = 0;

    let total = 0;
    for( const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total+ product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shiping = total > 0? 50 : 0 ;
    const tax = (total + shiping) *0.10;
    const grandTotal = total + shiping + tax ;
    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items Order: {totalQuantity} </h4>
            <p>Total : {total > 0? total.toFixed(2) : total}</p>
            <p>Shiping : {shiping}</p>
            <p>Tax : {tax > 0? tax.toFixed(2): tax}</p>
            <p>Grand Total : {grandTotal > 0? grandTotal.toFixed(2) : grandTotal}</p>
            {props.children}
        </div>
    );
};

export default AddToCart;