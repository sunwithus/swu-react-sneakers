import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>Избранное</h1>
      </div>
      <div className="sneakers-wrapper d-flex">
        {favorites.map((item, id) => (
          /*<Card key={id} favorited={true} onFavorite={onAddToFavorite} id={item.id} imageUrl={item.imageUrl} name={item.name} price />*/
          <Card key={id} favorited={true} onFavorite={(obj) => onAddToFavorite(obj)} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
