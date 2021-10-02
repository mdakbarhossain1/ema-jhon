import React, { useEffect, useState } from 'react';
import AddToCart from '../AddToCart/AddToCart';
import Products from '../Products/Products';
import {addToDb, getStoredCart} from '../../utilities/fakedb'
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts]= useState([]);
    const [cart,setCart] = useState([]);
    const [displayProducts,setDisplayProducts] = useState([])

    const handleAddToCart = product =>{
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if(exists){
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product] ;
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart);
        // setCart(cart)

        //save to local Storage (for now)
        addToDb(product.key)
    }

    useEffect(()=>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setDisplayProducts(data)
        })
    },[])


    useEffect(()=>{
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart){
                console.log(savedCart[key]);
                const addedProduct = products.find(product =>product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);

                }
                
            }
            setCart(storedCart);
        }
    },[products])
    console.log(displayProducts)

    const handleSearch = event =>{
                const searchText = event.target.value;
                const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
                setDisplayProducts(matchProducts)
    }


    return (
        <>
        <div className="search-container">
            <input type="text"
            onChange={handleSearch} placeholder="Search Product" />
        </div>
        <div className='shop'>
            <div className="products">
                <h2>Products : {products.length} </h2>
                {
                   displayProducts.map(product => <Products key={product.key} product={product} handleAddToCart={handleAddToCart}></Products>)
                }
            </div>
            <div className="add-to-cart">
                <AddToCart cart={cart}> 
                    <Link to="/review">
                        <button className= 'cart-btn'>Review Order</button>
                    </Link>
                </AddToCart>
            </div>
        </div>
        </>
    );
};

export default Shop;