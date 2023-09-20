import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Dashboard/Home';
import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import { useGetMeQuery } from './store/services/api';
import { useAppDispatch } from './store/store';
import { setUser } from './store/slices/userSlice';
import AuthRoute from './components/HOC/AuthRoute';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const {data ,isLoading} = useGetMeQuery()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    if(!isLoading) {
      if(data && data.user) {
           dispatch(setUser(data.user))
      }
      setLoading(false)
    }
  },[data,isLoading])

  return loading ? (
    <Loader />
  ) : (
    <>
     <ToastContainer/>
      <Routes>
        <Route path="auth" element={<AuthRoute />}>
        <Route path="signin" element={<SignIn/>}/>
        </Route>  
        <Route element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
