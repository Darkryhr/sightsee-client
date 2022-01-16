import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';

const CardCarousel = ({ vacations }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className='w-full mx-auto'>
      <Carousel responsive={responsive}>
        {vacations.map((vacation) => (
          <Card vacation={vacation} key={vacation.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default CardCarousel;
