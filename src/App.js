import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContext from './context';
/*export const AppContext = React.createContext({});*/

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCart = () => {
    setCartOpened(!cartOpened);
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  //useEffect при изменениях того, что в скобках [] что-то выполняет, в нашем сл - setItems => items = база кроссовок. [] - значит выполнится единожды
  React.useEffect(() => {
    /*fetch - встроенная функция в js, axios - библиотека*/

    async function fetchData() {
      try {
        const [itemsResponse, cartItemsResponse, favoritesResponse] = await Promise.all([axios.get('https://639f36b65eb8889197f747cc.mockapi.io/items'), axios.get('https://639f36b65eb8889197f747cc.mockapi.io/cart'), axios.get('https://64260794556bad2a5b487faa.mockapi.io/favorites')]);

        setIsLoading(false);

        setCartItems(cartItemsResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Произошла ошибка при запросе данных в App fetchData: ', error);
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      let findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      //console.log(findItem, ' zdhgdfhgd');
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://639f36b65eb8889197f747cc.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://639f36b65eb8889197f747cc.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Произошла ошибка при добавлении/удалинии товаров в/из корзины в App onAddToCart: ', error);
      console.error(error);
    }
  };

  const onRemoveFromCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(`https://639f36b65eb8889197f747cc.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Произошла ошибка при удалинии товаров из корзины в App onRemoveFromCart: ', error);
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64260794556bad2a5b487faa.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://64260794556bad2a5b487faa.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Attention! It does not happend! not added to favorites/ onAddToFavorite');
      console.error(error);
    }
  };

  const onRemoveFromFavorite = (id) => {
    console.log(id);
    /*axios.delete(`https://64260794556bad2a5b487faa.mockapi.io/favorites/${id}`);
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    console.log(id);*/
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} closeCart={onClickCart} onRemove={onRemoveFromCart} opened={cartOpened} />
        <Header showCart={onClickCart} />
        <Routes>
          <Route path="swu-react-sneakers/favorites/" element={<Favorites />} />

          <Route path="swu-react-sneakers/orders/" element={<Orders />} />

          <Route path="swu-react-sneakers/" element={<Home items={items} cartItems={cartItems} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} isLoading={isLoading} onRemoveFromFavorite={onRemoveFromFavorite} />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
