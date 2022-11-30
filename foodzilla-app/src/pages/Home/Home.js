import React from 'react';
import { Link } from 'react-router-dom'

function Home() {
    return ( 
        <>
        <h1>HOME</h1> 
        <Link to='/userlogin'>User Login</Link>
        <Link to='/ownerlogin'>Owner Login</Link>
        </>
    
    );
}

export default Home;