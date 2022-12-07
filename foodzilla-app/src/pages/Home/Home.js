import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar'

function Home() {
    return (
        <>
        <h1>HOME</h1> 
        <Link to='/userlogin'>User Login</Link>
        <Link to='/ownerlogin'>Owner Login</Link>
        <SideBar/> 
        </>
    );
}

export default Home;