import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/searchSlice';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let location = useLocation();

  const onSubmit = data => {
    dispatch(setSearch(data.search));
    reset();
  };

  if (location.pathname !== '/') return '';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full items-center justify-center'
    >
      <div className=' relative text-gray-600  border-2 border-gray-200 rounded-full w-full max-w-xs'>
        <input
          placeholder='Search'
          name='search'
          {...register('search')}
          className='h-8 px-5 text-sm focus:outline-none w-full rounded-full'
        />
        <button
          type='submit'
          className='absolute right-1 top-1/2  -translate-y-1/2 bg-indigo-600 p-2 rounded-2xl'
        >
          <svg
            className='text-white h-3.5 w-3.5 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            id='Capa_1'
            x='0px'
            y='0px'
            viewBox='0 0 56.966 56.966'
            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
            width='512px'
            height='512px'
          >
            <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
          </svg>
        </button>
      </div>
      {/* <button
        type='button'
        className=' text-red-500 font-bold py-1 px-4 mx-2 hover:bg-gray-100'
        onClick={() => setSearch('')}
      >
        Reset
      </button> */}
    </form>
  );
};

export default SearchBar;
