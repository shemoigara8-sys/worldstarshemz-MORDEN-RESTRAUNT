import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;