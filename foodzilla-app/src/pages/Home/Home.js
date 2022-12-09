import React from 'react';
import MainArea from '../../components/MainArea';
import SideBar from '../../components/SideBar';
import LeftSide from '../../components/LeftSide';

function Home() {
    return (
        <>
            <SideBar />
            <MainArea />
            <LeftSide />
        </>
    );
}

export default Home;