import './App.css';
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import Dashboard from './pages/Dashboard/Dashboard';
import Signin from './pages/Login/Signin';
import Signup from './pages/Login/Signup';
import Cart from './pages/CartItems/Cart'

function App() {
  return (
    <Router>
      <Fragment>
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/recipes' element={<Recipes />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </main>
      </Fragment>
    </Router>
  );
}

export default App;
