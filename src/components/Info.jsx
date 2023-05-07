import React from 'react';
import AppContext from '../context';

const Info = ({ title, description, image }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="d-flex align-center justify-center flex-column flex">
      <img src={image} alt="empty" className="mb-20" width="120px" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.jpg" width="22px" height="22px" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
