import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { useLoginMutation } from '../../services/auth';
import toast from 'react-hot-toast';
import { useGetFollowedMutation } from '../../services/follow';
import { setFollows } from '../../redux/followSlice';

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
  const [getFollows, { followIsLoading }] = useGetFollowedMutation();

  let from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setCredentials(user));
      const follows = await getFollows().unwrap();
      dispatch(setFollows(follows.data.followed));
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error('Oh no, there was an error!');
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
            Username
          </label>
          <input
            {...register('username', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.username && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input
            type='password'
            {...register('password', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.password && (
            <span className='text-xs text-red-500'>This field is required</span>
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
