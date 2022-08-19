import React from 'react';
import { useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';

const ProtectedRoute = () => {
  const auth = useSelector(state => state.auth);
  if (!auth.user) return 'Loading...';
  console.log(auth);
  return (
    <>
      <div className='mx-auto max-w-screen-2xl px-5 '>
        <h1 className='font-bold text-3xl'>{auth.user.username}</h1>
        <h4 className='text-gray-500 font-semibold text-sm'>{`${auth.user.firstName} ${auth.user.lastName}`}</h4>
        <h1>{`Around since ${format(parseISO(auth.user.createdAt), 'PP')}`}</h1>
      </div>
    </>
  );
};

export default ProtectedRoute;
