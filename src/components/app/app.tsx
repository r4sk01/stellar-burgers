import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { useDispatch } from 'react-redux';
import React from 'react';
import { Center } from '../center-title';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.backgroud;

  const renderRoute = (
    path: string,
    element: React.ReactNode,
    title: string
  ) => <Route path={path} element={<Center title={title}>{element}</Center>} />;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        {renderRoute(
          '/ingredients/:id',
          <IngredientDetails />,
          'Детали Ингридиента'
        )}
        <Route path='/feed' element={<Feed />} />
        {renderRoute(
          '/feed/:number',
          <OrderInfo />,
          `#${location.pathname.match(/\d+/)}`
        )}
        <Route element={<ProtectedRoute forAuthorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
