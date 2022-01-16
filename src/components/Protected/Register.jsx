import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../services/auth';
import toast from 'react-hot-toast';

import { setCredentials } from '../../redux/authSlice';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  let from = '/';

  const onSubmit = async (data) => {
    try {
      const user = await signUp(data).unwrap();
      dispatch(setCredentials(user));
      navigate(from, { replace: true });
    } catch (error) {
      toast('Oh no, there was an error!');
    }
  };

  console.log(errors);

  return (
    <div className='w-full max-w-xs mx-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-gray-100 shadow-lg border border-gray-200 rounded px-8 pt-6 pb-6 mb-4'
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            First Name
          </label>
          <input
            {...register('firstName', {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1'
          />
          {errors.firstName?.type === 'required' && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
          {errors.firstName?.type === 'pattern' && (
            <span className='text-xs text-red-500 '>
              This field should not contain any numbers or special characters
            </span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Last Name
          </label>
          <input
            {...register('lastName', {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1'
          />
          {errors.lastName?.type === 'required' && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
          {errors.lastName?.type === 'pattern' && (
            <span className='text-xs text-red-500'>
              This field should not contain any numbers or special characters
            </span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            {...register('username', {
              required: true,
              minLength: 6,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1'
          />
          {errors.username?.type === 'required' && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
          {errors.username?.type === 'minLength' && (
            <span className='text-xs text-red-500'>
              Username must be at least 6 characters long
            </span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input
            type='password'
            {...register('password', {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1'
          />
          {errors.password?.type === 'required' && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className='text-xs text-red-500'>
              Password must contain minimum 8 characters
            </span>
          )}
          {errors.password?.type === 'pattern' && (
            <span className='text-xs text-red-500'>
              Password at least one letter, one number and one special character
            </span>
          )}
        </div>
        <div className='flex items-center justify-between mt-8'>
          <button
            type='submit'
            className='font-bold block text-sm bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-400 transition-all'
          >
            Submit
          </button>
          <Link
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            to='/login'
          >
            Already a user?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
