import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from '../Card/Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
const Carousel = ({ vacations }) => {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full mx-auto'>
      <div className='py-8'>
        <Slider {...settings}>
          {vacations.map((vacation) => (
            <Card vacation={vacation} key={vacation.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div style={{ display: 'block' }} className={className}>
      <MdArrowForwardIos size={24} onClick={onClick} color='black' />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div style={{ display: 'block' }} className={className}>
      <MdArrowBackIos size={24} onClick={onClick} color='black' />
    </div>
  );
};
