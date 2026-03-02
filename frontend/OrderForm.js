import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = () => {
    if (!customerName || cart.length === 0) {
      setMessage('Please enter your name and select items.');
      return;
    }
    axios.post('http://localhost:5000/api/orders', { customerName, items: cart })
      .then(res => {
        setMessage(`Order received! Total: $${res.data.order.total}`);
        setCart([]);
        setCustomerName('');
      })
      .catch(err => setMessage('Error submitting order.'));
  };

  return (
    <div className="order-form">
      <h2>Place Your Order</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
      />

      <h3>Menu</h3>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => addToCart(item)}>Add</button>
          </li>
        ))}
      </ul>

      <h3>Cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${totalPrice}</h3>
      <button onClick={submitOrder}>Submit Order</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;