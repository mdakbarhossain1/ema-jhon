import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../Hooks/useCart';
import useProducts from '../../Hooks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import AddToCart from '../AddToCart/AddToCart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {

    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory()

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }

    const handlePlaceOrder =()=>{
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }



    return (
        <div>
            <div className='shop'>
                <div className="products">
                    <h2>Products : {products.length} </h2>
                    {
                        cart.map(product => <ReviewItem
                            key={product.key}
                            product={product}
                            handleRemove={handleRemove}
                        ></ReviewItem>)
                    }

                </div>
                <div className="add-to-cart">
                    <AddToCart cart={cart}>
                        <button onClick={handlePlaceOrder} className='cart-btn'>Place Order</button>
                    </AddToCart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;