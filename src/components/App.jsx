import React from 'react';
import { useGetAllVacationsQuery } from '../services/vacations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Toaster } from 'react-hot-toast';

import Footer from './navigation/Footer';
import Navbar from './navigation/Navbar';
import Carousel from './Carousel/Carousel';
import Login from './Protected/Login';
import Register from './Protected/Register';
import NotFoundPage from './NotFound';
import ProtectedRoute from './Protected/ProtectedRoute';
import RequireAuth from './Protected/RequireAuth';
import About from './about/About';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/browse'
            element={
              <RequireAuth>
                <ProtectedRoute />
              </RequireAuth>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;

const Main = () => {
  const { data, error, isLoading } = useGetAllVacationsQuery();
  return (
    <main className='container mx-auto'>
      <div className='w-full flex items-center '>
        <div className='md:px-10 md:py-10 p-8 relative'>
          <img
            src='https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            alt='hiking'
            className='shadow-lg rounded-3xl w-full'
          />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center'>
            <h1 className='text-xl font-bold tracking-tight pt-10 pb-4 px-6 text-white sm:text-4xl text-center'>
              Welcome to your next destination
            </h1>
            <button className='bg-white rounded-full text-indigo-500 font-semibold  py-2 px-4 flex items-center shadow-md hover:scale-105 transition-all w-36 justify-center'>
              <BiSearch className='mr-2' />
              Find More
            </button>
          </div>
        </div>
      </div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <div className='bg-white h-max py-10 px-6 w-full mx-auto'>
          <h3 className='font-bold text-3xl text-slate-800'>
            Check out our experiences
          </h3>
          <p className='text-slate-600 text-xl pt-1'>
            Holiday destinations you can totally 100% visit for real 🤞
          </p>
          <Carousel vacations={data.data.vacations} />
        </div>
      ) : null}
    </main>
  );
};
