import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { useLoginMutation } from '../../services/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  let from = location.state?.from?.pathname || '/';

  const onSubmit = async data => {
    try {
      const user = await login(data).unwrap();
      dispatch(setCredentials(user));
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error('Oh no, there was an error!');
    }
  };

  return (
    <div className='w-full max-w-lg mx-auto mt-10 shadow-lg'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded px-16 pt-12 pb-14 mb-4'
      >
        <h1 className='text-3xl font-bold mb-6 text-gray-700'>Sign In</h1>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-semibold mb-2'>
            Username
          </label>
          <input
            {...register('username', { required: true })}
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight transition focus:outline-3 focus:outline-indigo-400'
          />
          {errors.username && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            {...register('password', { required: true })}
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight transition focus:outline-3 focus:outline-indigo-400'
          />
          {errors.password && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>
        <div className='flex flex-col items-center justify-between mt-8'>
          <button
            type='submit'
            className='font-bold block text-sm w-full bg-indigo-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all'
          >
            Submit
          </button>
          <Link
            className='inline-block mt-6 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            to='/register'
          >
            Not a user yet?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
