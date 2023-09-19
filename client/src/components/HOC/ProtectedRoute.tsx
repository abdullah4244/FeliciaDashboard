import {
    Navigate,
  } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
  
  const AuthRoute = ({children} : {children: React.ReactNode}) => {
    const isAuthenticated = useAppSelector((state)=>state.activeUser.isAuthenticated)
    if (!isAuthenticated) {
      return <Navigate to={"/auth/signin"} replace />;
    } 
    return children;
  };

  export default AuthRoute;