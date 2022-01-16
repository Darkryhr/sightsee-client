import React from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addFollow, removeFollow } from '../../redux/followSlice';
import { useAddToMutation, useRemoveFromMutation } from '../../services/follow';

const Card = ({ vacation, following }) => {
  const dispatch = useDispatch();
  const [addingFollow] = useAddToMutation();
  const [removingFollow] = useRemoveFromMutation();
  const follow = async (id) => {
    try {
      await addingFollow(id);
      dispatch(addFollow(id));
    } catch (error) {
      console.log(error);
      toast.error('Oh no, there was an error!');
    }
  };

  const unfollow = async (id) => {
    console.log(id);
    try {
      await removingFollow(id);
      dispatch(removeFollow(id));
    } catch (error) {
      console.log(error);
      toast.error('Oh no, there was an error!');
    }
  };

  return (
    <div className='bg-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg max-w-xs overflow-hidden mx-2 border-gray-200 border'>
      <div className=''>
        <img
          className='object-cover h-60 w-80'
          src={vacation.img}
          alt={vacation.destination}
        />
      </div>
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <h4 className='font-semibold text-lg leading-tight truncate mb-2 capitalize'>
            {vacation.destination}
          </h4>
          <div className='text-gray-600 text-xs font-semibold tracking-wide pb-2 '>
            {format(new Date(vacation.startDate), 'MMM do, Y')}
          </div>
        </div>
        <div className='text-sm overflow-hidden h-20'>
          {vacation.description}
        </div>
        <div className='flex items-center justify-between pt-3'>
          <div className='mt-1 font-semibold text-gray-700'>
            ${vacation.price}
            <span className='text-gray-600 text-sm'></span>
          </div>
          {following ? (
            <button onClick={() => unfollow(vacation.id)}>
              <span className='text-red-400 font-semibold text-sm border-2 border-red-400 rounded-full py-1 px-3 leading-snug	tracking-tight hover:bg-gray-100'>
                Following
              </span>
            </button>
          ) : (
            <button onClick={() => follow(vacation.id)}>
              <span className=' text-gray-500 text-sm font-semibold rounded hover:bg-gray-200 px-3 py-2'>
                Follow
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
