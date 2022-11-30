import React from 'react';
import { Link } from 'react-router-dom'

function MainPage() {
    return ( 
    <>
    <h1>Main Page</h1> 
    <nav>
        <Link to='/mainpage'>MainPage</Link> 
        <Link to='/restaurants'>Restaurants</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/recipes'>Recipes</Link>
      </nav>
    </>
    );
}

export default MainPage;