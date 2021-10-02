import React from 'react';
import Rating from 'react-rating';
import './Products.css';


const Products = (props) => {
    const {product} = props;
    const {name,price,stock,seller,img,star } = product;
    const handleAddToCart = props.handleAddToCart;
    return (
        <div className='cards'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='card-info'>
                <h2>{name}</h2>
                <h4>$ {price}</h4>
                <p>only {stock} left in stock - order soon</p>
                <p>By: {seller}</p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly
                ></Rating>
                <br />
                <button onClick={()=>handleAddToCart(product)} className='cart-btn'>Add To cart</button>
            </div>
        </div>
    );
};

export default Products;