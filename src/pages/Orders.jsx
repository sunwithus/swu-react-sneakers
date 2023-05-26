import React from 'react';
import Card from '../components/Card';

import axios from 'axios';
//import AppContext from '../context';

function Orders() {
  //const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://64260794556bad2a5b487faa.mockapi.io/orders');
        //console.log(data);
        //console.log(data.map((obj) => obj.items));
        //console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        //setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], [])); //все товары из заказов в один массив
        setOrders(data);
        console.log(data.map((obj) => obj.items));
        //console.log(data.id);
        setIsLoading(false);
      } catch (error) {
        alert('error Orders');
        console.error(error);
        //<Card key={id} {...item} loading={isLoading} />
        /*
          {(isLoading ? [...Array(8)] : orders.reduce((prev, obj) => [...prev, ...obj.items], [])).map((item, id) => (
            <Card key={id} {...item} loading={isLoading} />
          ))}
        */
      }
    })();
  }, []);
  //const { orders, onAddToOrders } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers-wrapper d-flex d-column">
        {isLoading
          ? [...Array(8)].map((_, index) => <Card key={index} loading={isLoading} />)
          : orders.map((order) => (
              <div key={order.id}>
                <p>Order #{order.id}</p>
                <div className={'d-row'}>
                  {order.items.map((item, id) => (
                    <Card key={id} {...item} loading={isLoading} />
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Orders;
