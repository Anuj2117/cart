import React, { useState } from 'react';
import "../App.css"
function Products() {
    const products = [
        {id: 1, name: 'Product-1', price: 100},
        {id: 2, name: 'Product-2', price: 200},
        {id: 3, name: 'Product-3', price: 300},
        {id: 4, name: 'Product-4', price: 400},
        {id: 5, name: 'Product-5', price: 500},
    ];

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleAddProduct = () => {
        const availableProducts = products.filter(p => !selectedProducts.find(sp => sp.id === p.id));
        if (availableProducts.length > 0) {
            const productToAdd = availableProducts[0];
            setSelectedProducts([...selectedProducts, { ...productToAdd, quantity: 1 }]);
        }
    };

    const handleIncreaseQuantity = (product) => {
        setSelectedProducts(selectedProducts.map(p => {
            if (p.id === product.id) {
                return { ...p, quantity: p.quantity + 1 };
            }
            return p;
        }));
    };

    const handleDecreaseQuantity = (product) => {
        setSelectedProducts(selectedProducts.map(p => {
            if (p.id === product.id && p.quantity > 0) {
                return { ...p, quantity: p.quantity - 1 };
            }
            return p;
        }).filter(p => p.quantity > 0));
    };

    const totalAmount = selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

    return (
        <>
            <div className='wrapper'>
                <div className="left">
                    <div className="button">
                        <button onClick={handleAddProduct}>Add Product</button>
                    </div>
                    <div className="product">
                        {selectedProducts.map(product => (
                            <div key={product.id}>
                                <span>{product.name}</span>
                                <button onClick={() => handleIncreaseQuantity(product)}>+</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleDecreaseQuantity(product)}>-</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right">
                    <div className="list">
                        {selectedProducts.map(product => (
                            <div key={product.id}>
                                <span>{product.name}: {product.quantity} x {product.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="total">
                        <h3>Total: {totalAmount}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
