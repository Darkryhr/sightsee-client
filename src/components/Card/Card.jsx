import React, { useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addFollow, removeFollow } from '../../redux/followSlice';
import { useAddToMutation, useRemoveFromMutation } from '../../services/follow';
import { useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';

const Card = ({ vacation, following = null }) => {
  const dispatch = useDispatch();
  const [addingFollow] = useAddToMutation();
  const [removingFollow] = useRemoveFromMutation();
  const [isFollow, setIsFollow] = useState(following);
  const auth = useSelector(state => state.auth);

  const updateFollow = async id => {
    const update = async id => {
      try {
        if (isFollow) {
          await removingFollow(id);
          dispatch(removeFollow(id));
          setIsFollow(false);
        } else {
          await addingFollow(id);
          dispatch(addFollow(id));
          setIsFollow(true);
        }
      } catch (error) {
        console.log(error);
        toast.error('Oh no, there was an error!');
      }
    };

    if (!auth.user) {
      toast.error('You must be logged in to heart a destination');
      return;
    }

    console.log('ID:');
    console.log(id);

    toast.promise(update(id), {
      loading: 'Loading',
      success: 'Followed!',
      error: 'Error when fetching',
    });
  };

  // dannyboi
  // P%8n2Jwi

  return (
    <div className='overflow-hidden relative w-40 sm:w-60 lg:w-72 mx-auto mb-6'>
      <img
        className='object-cover rounded-lg mb-3 w-full h-40 sm:h-60 lg:h-72'
        src={vacation.img}
        alt={vacation.destination}
      />
      <h4 className='font-semibold text-lg leading-tight truncate capitalize'>
        {vacation.destination}
      </h4>
      <p className='text-gray-600 text-sm'>
        {format(new Date(vacation.startDate), 'MMM do, Y')}
      </p>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-gray-700 mt-1'>${vacation.price}</p>
        <button
          className='absolute top-0 left-0 ml-2 mt-3'
          onClick={() => updateFollow(vacation.id)}
        >
          <AiFillHeart
            size={24}
            className={`${
              isFollow
                ? 'fill-red-700'
                : 'fill-gray-700 stroke-red-700 opacity-50'
            }
            `}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
