import './App.css';
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home';
import UserLogin from './pages/Login/Signin';
import UserSignup from './pages/Login/Signup'
import OwnerLogin from './pages/Login/OwnerLogin';
import Restaurants from './pages/Restaurants/Restaurants';
import Recipes from './pages/Recipes/Recipes';
import AddRestaurant from './pages/Restaurants/AddRestaurant';
import Dashboard from './pages/Dashboard/Dashboard';
import MainPage from './pages/MainPage/MainPage';
import Admin from './pages/Admin/Admin';
import Signin from './pages/Login/Signin';
import AddProduct from './pages/Admin/AddProduct';


function App() {
  return (
    <Router>
      <Fragment>
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/userlogin' element={<UserLogin />}></Route>
            <Route path='/ownerlogin' element={<OwnerLogin />}></Route>
            <Route path='/restaurants' element={<Restaurants />}></Route>
            <Route path='/recipes' element={<Recipes />}></Route>
            <Route path='/addrestaurant' element={<AddRestaurant />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/mainpage' element={<MainPage />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/addProduct' element={<AddProduct />}></Route>
          </Routes>
        </main>
      </Fragment>
    </Router>
  );
}

export default App;
