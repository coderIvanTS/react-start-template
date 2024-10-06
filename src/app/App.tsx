import React, { useLayoutEffect } from 'react';
import './App.css';
import { ThemeProvider } from '../shared/ThemeProvider';
import { LangProvider } from '../shared/LangProvider/LangProvider';
import { Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { CartPage } from '../pages/CartPage/CartPage';
import '../shared/ThemeProvider/ThemeProvider.css';
import { LoginPage } from '../pages/LoginPage';
import { RoutePrivate } from '../shared/RoutePrivate/RoutePrivate';
import { useDispatch } from 'react-redux';
import { appInitiated } from '../store/slices/authAndProfile';
import { RoutePrivateAdmin } from '../shared/RoutePrivateAdmin/RoutePrivateAdmin';
import { AdminEditProductPage } from '../pages/AdminEditProductPage/AdminEditProductPage';
import { AccessDeniedPage } from '../pages/AccessDeniedPage/AccessDeniedPage';
import { RegisterFuncPage } from '../pages/RegisterFuncPage/RegisterFuncPage';
import { RegisterSagaPage } from '../pages/RegisterSagaPage/RegisterSagaPage';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(appInitiated())
  }, []);

  return (
    <ThemeProvider>
      <LangProvider>
        <div className="App">
          <Routes>
            <Route path='*' element={<NotFoundPage />} />

            <Route path='register_func' element={<RegisterFuncPage />} />
            <Route path='register_saga' element={<RegisterSagaPage />} />

            <Route path='login' element={<LoginPage />} />
            <Route path={"/"} element={<MainPage />} />
            <Route path={"product"} element={<ProductPage />} />
            <Route path={"product_edit_admin"} element={
              <RoutePrivateAdmin>
                <AdminEditProductPage />
              </RoutePrivateAdmin>
            }
            />
            <Route path={"cart"} element={<CartPage />} />
            <Route path={"access_denied_page"} element={<AccessDeniedPage />} />
            <Route path={"profile"} element={
              <RoutePrivate>
                <ProfilePage />
              </RoutePrivate>
            } />
          </Routes>
        </div>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;