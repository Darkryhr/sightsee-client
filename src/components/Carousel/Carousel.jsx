import React from 'react';
import PluginCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';

const Carousel = ({ vacations }) => {
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
      <PluginCarousel
        responsive={responsive}
        className='px-2 pt-10'
        infinite={true}
        centerMode={true}
        itemclassName='carousel-item-padding-40px'
        containerclassName='margin-auto'
      >
        {vacations.map((vacation) => (
          <Card vacation={vacation} key={vacation.id} />
        ))}
      </PluginCarousel>
    </div>
  );
};

export default Carousel;
