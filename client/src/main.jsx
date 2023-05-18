import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import HomePage from './pages/HomePage.jsx'
import LoginPage, { action as loginFormAction } from './pages/LoginPage.jsx';
import RegisterPage, {action as registerFormAction} from './pages/RegisterPage.jsx';
import ProfilePage, { action as updateFormAction } from './pages/ProfilePage.jsx'

import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<HomePage />}/>
      <Route path='login' element={<LoginPage />} action={loginFormAction}/>
      <Route path='register' element={<RegisterPage />} action={registerFormAction}/>
      <Route element={<PrivateRoute/>}>
        <Route path='profile' element={<ProfilePage />} action={updateFormAction}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={ router }/>
      </React.StrictMode>
    </Provider>
)
