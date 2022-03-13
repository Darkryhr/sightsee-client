import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllVacationsQuery } from '../../services/vacations';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { useForm } from 'react-hook-form';

const ProtectedRoute = () => {
  const { data, error, isLoading } = useGetAllVacationsQuery();
  const follows = useSelector(state => state.follows);
  const [search, setSearch] = useState('');

  const vacationMap = () =>
    data.data.vacations.map(vacation => (
      <Card
        vacation={vacation}
        key={vacation.id}
        following={follows.includes(vacation.id)}
      />
    ));

  const renderBySearch = () => {
    return vacationMap().filter(vacation => {
      if (vacation.props.vacation.destination.includes(search)) return vacation;
    });
  };

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <div className='w-fit mx-auto'>
          <SearchBar setSearch={setSearch} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12'>
            {search ? renderBySearch() : vacationMap()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProtectedRoute;

const SearchBar = ({ setSearch }) => {
  const { register, reset, handleSubmit } = useForm();

  const onSubmit = data => {
    setSearch(data.search);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-4 flex w-full items-center justify-center'
    >
      <div className=' relative text-gray-600  border-2 border-gray-200 rounded-full'>
        <input
          placeholder='Search'
          name='search'
          {...register('search')}
          className='  h-10 px-5 pr-16  text-sm focus:outline-none w-full rounded-full'
        />
        <button type='submit' className='absolute right-0 top-0 mt-3 mr-4'>
          <svg
            className='text-gray-600 h-4 w-4 fill-current'
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
      <button
        type='button'
        className=' text-red-500 font-bold py-1 px-4 mx-2 hover:bg-gray-100'
        onClick={() => setSearch('')}
      >
        Reset
      </button>
    </form>
  );
};
