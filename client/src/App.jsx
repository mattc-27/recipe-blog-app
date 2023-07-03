import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../userContext'

import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Layout from './app/components/Layout';
import AppLayout from './blog/AppLayout';

import Home from './blog/Home';

import Register from './blog/login-reg/Register';
import Login from './blog/login-reg/Login';

import Dashboard from './app/pages/Dashboard';
import Profile from './app/pages/Profile';
import UserRecipes from './app/recipes/UserRecipes';
import ModifyRecipe from './app/pages/ModifyRecipe';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard/:userId',
    element: <Dashboard />
  },
  {
    path: '/profile/:userId',
    element: <Profile />
  },
  {
    path: '/recipes/:userId/all',
    element: <UserRecipes />
  },
  {
    path: '/recipes/:userId/:id/edit',
    element: <ModifyRecipe />
  },
])

function App() {


  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/home/:userId' element={<Home />} />
            <Route path='/dashboard/:userId' element={<Dashboard />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/recipes/:userId/all' element={<UserRecipes />} />
            <Route path='/recipes/:userId/:id/edit' element={<ModifyRecipe />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
};

export default App;