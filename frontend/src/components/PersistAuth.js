import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';
const PersistAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return null;
};

export default PersistAuth;
