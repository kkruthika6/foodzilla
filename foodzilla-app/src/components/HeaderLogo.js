import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { showSideBar } from '../actions'
import { HiMenuAlt1 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import '../styles/header.css'

function HeaderLogo(props) {

    const dispatch = useDispatch()
    return (
        <div className='logoheader'>
            <div className="foodzillalogo">
                <div className="responsive" onClick={() => dispatch(showSideBar(true))}>
                    <HiMenuAlt1 />
                </div>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <h2>{props.title}</h2>
        </div>
    );
}

export default HeaderLogo;