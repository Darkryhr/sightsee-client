import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineMenuOpen, MdOutlineMenu } from 'react-icons/md';
import SearchBar from '../Searchbar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let ref = useRef(null);

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

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  });

  return (
    <header className='flex justify-between max-w-screen-2xl mx-auto items-center px-5 2xl:px-0 py-3'>
      <div className='flex w-full max-w-md justify-start'>
        <Link to='/'>
          <h1 className='font-extrabold text-2xl tracking-tight transition hover:text-indigo-600 pb-1'>
            sightsee
          </h1>
        </Link>
      </div>
      <div className='w-full max-w-xs hidden sm:block'>
        <SearchBar />
      </div>
      <div className='sm:flex items-center hidden w-full max-w-md justify-end'>
        {/* <Link
          className='font-bold transition duration-200 hover:opacity-60 px-3'
          to='/browse'
        >
          Browse
        </Link> */}
        <Link
          className='font-semibold text-gray-700 transition duration-200 hover:opacity-60 px-3'
          to='/about'
        >
          About
        </Link>
        {auth.user ? (
          <button
            type='button'
            onClick={() => logout()}
            className='bg-white transition text-gray-900 font-semibold py-1 pr-2 pl-3 rounded-full hover:shadow-lg ml-2 border border-gray-300'
          >
            <div className='flex justify-between items-center'>
              <span className='text-sm pr-2 text-gray-500'>Logout</span>
              <div className='bg-gray-500 w-6 h-6 rounded-3xl'></div>
            </div>
          </button>
        ) : (
          <Link to='/login'>
            <button
              type='button'
              className='bg-indigo-600 transition text-white font-semibold py-1.5 px-4 rounded-full hover:bg-indigo-500'
            >
              Login
            </button>
          </Link>
        )}
      </div>
      <div className='sm:hidden'>
        <button
          type='button'
          className='block text-gray-800 hover:text-blue-700 focus:text-blue-700 focus:outline-none'
          onClick={() => setIsOpen(true)}
        >
          <MdOutlineMenuOpen size={26} />
        </button>
      </div>
      {isOpen && (
        <div
          className='h-[30vh] absolute top-0 right-0 z-10 w-full flex items-start justify-center sm:hidden mt-6'
          ref={ref}
        >
          <MobileMenu
            auth={auth}
            setIsOpen={setIsOpen}
            handleClickOutside={handleClickOutside}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;

export const MobileMenu = ({ auth, setIsOpen, handleClickOutside }) => {
  return (
    <div className='h-full p-4 bg-white w-11/12 rounded-lg border border-gray-300 flex flex-col items-center justify-center relative'>
      <button
        type='button'
        className=' w-full flex justify-center transition duration-200 py-2 hover:bg-gray-200'
        onClick={() => setIsOpen(false)}
      >
        <MdOutlineMenu size={26} />
      </button>
      <SearchBar />
      <Link
        className='font-bold transition duration-200 w-full text-center py-3 hover:bg-gray-200'
        onClick={() => handleClickOutside()}
        to='/browse'
      >
        Browse
      </Link>
      <Link
        className='font-bold transition duration-200 w-full text-center py-3 hover:bg-gray-200'
        onClick={() => handleClickOutside()}
        to='/about'
      >
        About
      </Link>
      {auth.user ? (
        <button
          type='button'
          onClick={() => logout()}
          className='bg-indigo-600 transition text-white font-semibold w-full rounded-md py-3 hover:bg-indigo-500'
        >
          Logout
        </button>
      ) : (
        <Link to='/login'>
          <button
            type='button'
            className='bg-indigo-600 transition text-white font-semibold py-1 px-4 rounded-full hover:bg-indigo-500 '
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
};
