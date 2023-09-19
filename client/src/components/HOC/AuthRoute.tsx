import {
    Navigate,
    Outlet,
  } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
  
  const AuthRoute = () => {
    const isAuthenticated = useAppSelector((state)=>state.activeUser.isAuthenticated)
    if (isAuthenticated) {
      return <Navigate to={"/"} replace />;
    } 
    return <Outlet />;
  };

  export default AuthRoute;