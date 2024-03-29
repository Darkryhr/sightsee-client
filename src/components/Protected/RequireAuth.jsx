import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
function RequireAuth({ children }) {
  let location = useLocation();
  const auth = useSelector(state => state.auth);
  useEffect(() => {}, []);
  if (!auth.user) {
    toast.error('Login to view this page');
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
