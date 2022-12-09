import './App.css';
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import Dashboard from './pages/Dashboard/Dashboard';
import Signin from './pages/Login/Signin';
import Signup from './pages/Login/Signup';
import Cart from './pages/CartItems/Cart';
import Search from './pages/Home/Search';
import Address from './pages/Address/Address';
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/Admin';
import AddProduct from './pages/Admin/AddProduct';


function App() {
  return (
    <Router>
      <Fragment>
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path="/search" element={<Search/>}/>
            <Route path="/your-address" element={<Address/>}/>
            <Route path='/recipes' element={<Recipes />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile/>}/>
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
