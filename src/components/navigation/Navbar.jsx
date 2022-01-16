import React from 'react';
import logo from './sightsee-logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    try {
      dispatch(clearCredentials());
      toast('Goodbye 👋');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast('Oh no, there was an error!');
    }
  };

  return (
    <header className='bg-white sm:flex sm:justify-between sm:px-4 sm:py-6 container mx-auto'>
      <div className='flex items-center justify-between  px-4 py-3 sm:p-0'>
        <div>
          <Link to='/'>
            <img className='h-8' src={logo} alt='logo' />
          </Link>
        </div>

        <div className='sm:hidden'>
          <button
            type='button'
            className='block text-gray-700 hover:text-blue-700 focus:text-blue-700 focus:outline-none'
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
              {isOpen ? (
                <path
                  fill-rule='evenodd'
                  d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                />
              ) : (
                <path
                  fillRule='evenodd'
                  d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`px-2 pb-4 pt-2 sm:flex sm:p-0 sm:items-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <Link
          className='block font-bold text-md hover:bg-gray-100 rounded px-2 py-1'
          to='/browse'
        >
          Browse
        </Link>
        <Link
          className='block font-bold text-md hover:bg-gray-100 rounded px-2 py-1 mt-1 sm:mt-0 sm:ml-2'
          to='/about'
        >
          About
        </Link>

        <div>
          {auth.user ? (
            <button
              type='button'
              onClick={() => logout()}
              className='font-bold block text-sm bg-blue-700 mb-1 text-white px-5 py-2 rounded-full hover:bg-blue-400 sm:ml-4 mt-1 transition-all'
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button
                type='button'
                className='font-bold block text-sm bg-blue-700 mb-1 text-white px-5 py-2 rounded-full hover:bg-blue-400 sm:ml-4 mt-1 transition-all'
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
