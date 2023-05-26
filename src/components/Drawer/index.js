import React from 'react';
import Info from '../Info';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

function Drawer({ items = [], closeCart, onRemove, opened }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onCloseCartAndResetOrder = () => {
    setIsOrderComplete(false);
    closeCart();
  }

  const onClickOrder = async () => {
    //console.log(items.cartItems);
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://64260794556bad2a5b487faa.mockapi.io/orders', { items: cartItems });

      setOrderId(data.id);
      //axios.post('https://639f36b65eb8889197f747cc.mockapi.io/orders', cartItems);

      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        await axios.delete('https://639f36b65eb8889197f747cc.mockapi.io/cart/' + element.id);
        await sleep(1000);
      }
    } catch (error) {
      alert("It's couldn't create order! :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between align-center">
          Корзина
          <img className="cu-p" height={20} width={20} src="img/delete.svg" alt="Close" onClick={onCloseCartAndResetOrder} />
        </h2>

        {items.length > 0 ? (
          <div className="flex d-flex flex-column">
            <div className="items">
              {items.map((val) => (
                <div key={val.id} className="cartItem d-flex align-center mt-20">
                  <div style={{ backgroundImage: `url(${val.imageUrl})` }} className="mr-10 cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p>{val.name}</p>
                    <b>{val.price} руб.</b>
                  </div>
                  <img className="deleteBtn" height={20} width={20} src="img/delete.svg" alt="Delete" onClick={() => onRemove(val.id)} />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(totalPrice * 0.05).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} type="submit" className="greenBtn" onClick={onClickOrder}>
                Оформить заказ
                <img height={20} width={20} src="img/right-arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info title={isOrderComplete ? 'Заказ выполнен' : 'Корзина пустая'} description={isOrderComplete ? `Ваш заказ № ${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} image={isOrderComplete ? 'img/complite-order.webp' : 'img/cart-empty.png'} />
        )}
      </div>
    </div>
  );
}

export default Drawer;
