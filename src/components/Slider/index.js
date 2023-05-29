import React from 'react';
import './Slider.css';

function Slider() {
  return (
    <div className="slide-container">
      <div className="slide-pos-center">
        <img className="slider-image" src="img/logo/1XjZ.gif" alt="1" />
        <img className="slider-image" src="img/logo/7d0b.gif" alt="2" />
        <img className="slider-image" src="img/logo/9iW6.gif" alt="3" />
      </div>
    </div>
  );
}
/*
    <div className="slider">
      <img className='slider-img-g' src="img/logo/9iW6.gif" alt="logo" />
    </div>
    <div className="slider">
      <img className='slider-img'  src="img/logo/1XjZ.gif" alt="logo" />
    </div>
*/
export default Slider;
