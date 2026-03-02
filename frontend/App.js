import React from 'react';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>🍽️ My Restaurant</h1>
      </header>
      <Menu />
      <OrderForm />
    </div>
  );
}

export default App;