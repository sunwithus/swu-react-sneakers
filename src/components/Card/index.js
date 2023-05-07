import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({ id, imageUrl, name, price, onFavorite, onPlus, favorited = false, added = false, loading = false }) {
  let { isItemAdded } = React.useContext(AppContext);
  //const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const objOnClick = { id, parentId: id, imageUrl, name, price };

  const onClickPlus = () => {
    onPlus(objOnClick);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(objOnClick, isFavorite, loading);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader speed={2} width={179} height={225} viewBox="0 0 179 225" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
          <rect x="0" y="13" rx="22" ry="22" width="178" height="120" />
          <rect x="0" y="150" rx="8" ry="8" width="178" height="30" />
          <rect x="0" y="195" rx="8" ry="8" width="69" height="30" />
          <rect x="148" y="195" rx="8" ry="8" width="30" height="30" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img onClick={onClickFavorite} src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="Unliked" width={25} height={25} />
            </div>
          )}
          <img className={styles.top} width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price: </span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img className={styles.button} onClick={onClickPlus} src={isItemAdded(id) ? '/img/checked.svg' : '/img/plus.svg'} alt="Plus" />}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
