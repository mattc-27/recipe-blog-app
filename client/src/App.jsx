import { useState, useEffect, useContext } from 'react';
import { UserProvider } from '../userContext';

import './nav.css';
import './main.css';


import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import AppLayout from './app/components/AppLayout';
import HomeLayout from './blog/HomeLayout';

import Home from './blog/Home';

import Register from './blog/login-reg/Register';
import Login from './blog/login-reg/Login';

import Dashboard from './app/pages/Dashboard';
import Profile from './app/pages/Profile';
import UserRecipes from './app/recipes/UserRecipes';
import ModifyRecipe from './app/pages/ModifyRecipe';
import RecipePage from './blog/RecipePage';
import Blog from './app/pages/Blog';

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
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/dashboard/:user_id',
    element: <Dashboard />
  },
  {
    path: '/profile/:user_id',
    element: <Profile />
  },
  {
    path: '/recipes/:user_id/all',
    element: <UserRecipes />
  },
  {
    path: '/recipes/:user_id/:recipe_id/edit',
    element: <ModifyRecipe />
  },
  {
    path: '/recipes/:recipe_id',
    element: <RecipePage />
  }
])

function App() {


  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route path='/blog/:user_id' element={<Blog />} />
            <Route path='/dashboard/:user_id' element={<Dashboard />} />
            <Route path='/profile/:user_id' element={<Profile />} />
            <Route path='/recipes/:user_id/all' element={<UserRecipes />} />
            <Route path='/recipes/:user_id/:recipe_id/edit' element={<ModifyRecipe />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/recipes/:recipe_id' element={<RecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
};

export default App;