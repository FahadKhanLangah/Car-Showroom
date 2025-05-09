import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';


const PersistAuth = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuth) {
      dispatch(loadUser())
    }
  }, [dispatch, isAuth])

  return null;
};

export default PersistAuth;
