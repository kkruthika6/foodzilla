import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Dashboard.css';

function Dashboard() {
    const initFeed = [
        'Collect Pizza @243 Columbus Ave', 'Collect 6 Burgers @120 Huntington Ave'
    ];

    const [feed, setFeed] = useState(initFeed);
    const [click, setClick] = useState(false);
    
    useEffect(() => {
        if (click === true) {
            const listdata = document.getElementById("ft").value;
            const list = feed;
            list.push(listdata);
            setFeed(list);
            setClick(false);
            document.getElementById("ft").value='';
        }
    }, [click])

    return (
        <>
            <header>
                <h1>FoodZilla</h1>
                <nav class="nav" id="myTopnav">
                    <Link to='/mainpage'>Home</Link>
                    <Link to='/restaurants'>Restaurants</Link>
                    <Link to='/recipes'>Recipes</Link>
                    <Link to='/dashboard'>Dashboard</Link>
                </nav>
            </header>
            <div class="container">
                <Container>
                    <Col md="3">
                        <h3></h3>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <br /><br /><br /><br /><br /><br />
                                    <h2>Have Leftovers?</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="11">
                        <h3></h3>
                        <Card>
                            <Card.Body>
                                <Card.Title>Check the feed!</Card.Title>
                                <Card.Text>
                                    <div className='feed'>
                                        {feed !== [] ? feed.map((f) => {
                                            return(
                                            <Alert className='feedtext'>
                                                {f}
                                            </Alert>
                                            )
                                        }) : null}
                                    </div>
                                    <div className='send'>
                                        <input type="text" placeholder='Enter message' id='ft' />
                                        <Button variant="secondary" className='sendbtn' onClick={() => {setClick(true)}}>Send</Button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div>
            <footer>
                <ul>
                    <li>Tel: <a href="telto:(617)-922 2434">(617)-922 2434</a></li>
                    <li>Address: Boston, MA</li>
                    <li>Mail to: <a href="mailto:enquire@foodzilla.com">enquire@foodzilla.com</a></li>
                </ul>
            </footer>
        </>
    )
}

export default Dashboard