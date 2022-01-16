import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from '../Card/Card';

const Carousel = ({ vacations }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className='w-full mx-auto'>
      <Slider {...settings}>
        {vacations.map((vacation) => (
          <Card vacation={vacation} key={vacation.id} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
