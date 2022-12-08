import React from 'react';
import { Link } from 'react-router-dom';
import LeftSide from '../../components/LeftSide';
import MainArea from '../../components/MainArea';
import SideBar from '../../components/SideBar'

function Home() {
    return (
        <>
        <MainArea />
        <SideBar/> 
        <LeftSide/> 

        </>
    );
}

export default Home;