import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
