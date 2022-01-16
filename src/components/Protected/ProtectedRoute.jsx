import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllVacationsQuery } from '../../services/vacations';
import Card from '../Card/Card';

const ProtectedRoute = () => {
  const { data, error, isLoading } = useGetAllVacationsQuery();
  const follows = useSelector((state) => state.follows);

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <div className='w-fit mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12'>
            {data.data.vacations.map((vacation) => (
              <Card
                vacation={vacation}
                key={vacation.id}
                following={follows.includes(vacation.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProtectedRoute;
