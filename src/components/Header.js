import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();
  const PATH = 'swu-react-sneakers/';
  //const PATH = '';

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="swu-react-sneakers/">
        <div className="d-flex align-center">
          <img className="m-r-15" src="img/logo.png" alt="logo" height={40} width={55} />

          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex ">
        <li className="mr-30 cu-p" onClick={props.showCart}>
          <img src="img/cart.svg" alt="cart" height={18} width={18} />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="cu-p mr-20 ">
          <Link to={`${PATH}favorites`}>
            <img src="img/favorites.jpg" alt="favorites" height={18} width={18} />
          </Link>
        </li>
        <li className="cu-p">
          <Link to={`${PATH}orders`}>
            <img src="img/user.svg" alt="user" height={18} width={18} />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
