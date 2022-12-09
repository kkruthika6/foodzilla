import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'
import {useDispatch} from 'react-redux'
import { showSideBar } from '../../actions'
import './Dashboard.css';
import {HiMenuAlt1} from 'react-icons/hi'
import SideBar from '../../components/SideBar';

function Dashboard() {
    const [feed, setFeed] = useState([]);
    const [click, setClick] = useState(false);
    const dispatch =useDispatch()
    useEffect(() => {
        if (click === true) {
            const listdata = document.getElementById("ft").value;
            const address = document.getElementById("location").value
            const location = "http://maps.google.com/maps?q=" + encodeURIComponent(address);
            const contact = document.getElementById("ph").value;
            const list = feed;
            list.push({ info: listdata, loc: location, address: address, contact: contact });
            setFeed(list);
            setClick(false);
            document.getElementById("ft").value = '';
            document.getElementById("location").value = '';
            document.getElementById("ph").value = '';
        }
    }, [click])

    return (
        <>
            <SideBar />
            <div className='top'>
            <div className="foodlogo">
              <div className="mob" onClick={()=>dispatch(showSideBar(true))}>
               <HiMenuAlt1/>
              </div>
              
              <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <h2>Have Leftovers?</h2>
            </div>
            <br />
            
            <div class="container">
                <Container>
                <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title>Check the feed!</Card.Title>
                            <Card.Text>
                                <div className='feed'>
                                    {feed !== null ? feed.map((f) => {
                                        return (
                                            <Alert className='feedtext'>
                                                {f.info + ' @ '}
                                                <a href={f.loc} target="_blank">{f.address}</a><br />{" Please contact on "}
                                                <a href={"https://wa.me/" + f.contact}>{"Whatsapp"}</a>
                                            </Alert>
                                        )
                                    }) : null}
                                </div>
                                <div className='send'>
                                    <input type="text" placeholder='Enter message' id='ft' />
                                    <input type="text" placeholder='Enter location' id='location' />
                                    <input type="text" placeholder='Enter Contact number' id='ph' />
                                    <button onClick={() => { setClick(true) }}>Send</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Dashboard