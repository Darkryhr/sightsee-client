import React from 'react';
import { useGetAllVacationsQuery } from '../services/vacations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './navigation/Footer';
import Navbar from './navigation/Navbar';
import Login from './Protected/Login';
import Register from './Protected/Register';
import NotFoundPage from './NotFound';
import ProtectedRoute from './Protected/ProtectedRoute';
import RequireAuth from './Protected/RequireAuth';
import About from './about/About';
import Loader from './Loader/Loader';
import Card from './Card/Card';
import { useSelector } from 'react-redux';
import { useGetFollowedQuery } from '../services/follow';

const App = () => {
  return (
    <>
      <Router>
        <div className='w-full'>
          <Navbar />
        </div>
        <div className='mx-auto min-h-screen max-w-screen-2xl pt-1 pb-20'>
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
        </div>
      </Router>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;

const Main = () => {
  const { data, error, isLoading } = useGetAllVacationsQuery();
  const follow = useGetFollowedQuery();
  const search = useSelector(state => state.search);

  if (follow.isLoading) return null;

  const vacationMap = () =>
    data.data.vacations.map(vacation => (
      <Card
        vacation={vacation}
        key={vacation.id}
        following={follow?.data?.data?.followed?.includes(vacation.id)}
      />
    ));

  const renderBySearch = () => {
    return vacationMap().filter(vacation => {
      if (vacation.props.vacation.destination.includes(search)) return vacation;
    });
  };

  return (
    <main>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:px-0 pt-6 mx-auto sm:px-4 gap-6'>
            {renderBySearch()}
          </div>
        </div>
      ) : null}
    </main>
  );
};
