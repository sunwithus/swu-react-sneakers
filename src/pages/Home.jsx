import React from 'react';
import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite, onRemoveFromFavorite, isLoading }) {

  const renderItems = () => {
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(item) => onAddToCart(item)}
        //added={isItemAdded(item && item.id)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        {...item}
        loading={isLoading}
        /*onFavorite={(item, toDo) => (onAddToFavorite(item))} */
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" height={25} width={25} />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear-btn" height="18" width="18" src="/img/delete.svg" alt="Clear" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="search..." />
        </div>
      </div>

      <div className="sneakers-wrapper d-flex">{renderItems()}</div>
    </div>
  );
}

export default Home;
