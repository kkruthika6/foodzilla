import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Col } from 'react-bootstrap';
import './Recipes.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


function Recipes() {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);

    if (flag === false) {
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: { from: '0', size: '20', tags: 'under_30_minutes' },
            headers: {
                'X-RapidAPI-Key': '265953d2fdmshea7f9345dced5adp18d1ecjsn357649d41fe7',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            console.log(response.data.results)
            setData(response.data.results);
            setFlag(true);
        }).catch(function (error) {
            console.error(error);
        });

    }

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
        <div className='container'>
            <Container>
                <Col md="3">
                    <h3></h3>
                    <Card className='title'>
                        <Card.Body>
                            <Card.Text>
                                <br /><br /><br /><br /><br /><br />
                                <h2>Tasty Recipes</h2>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="11">
                    <h3></h3>
                    <Card>
                        <Card.Body>
                            <Card.Title>Check the recipes!</Card.Title>
                            <Card.Text>
                                <div className='feed'>
                                {flag === false ? <div className='loader'><Spinner animation="border" variant="dark" /></div> :
                                data !== undefined && data.length !== 0 ?
                                    data.map((d) => {
                                        return (
                                            <>
                                                <Col md='12'>
                                                    <Card className="card">
                                                        <Card.Header>{d.name}<br /></Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                {d.yields}
                                                                <br />
                                                                {d.description}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <br />
                                            </>
                                        )
                                    })
                                    : null}
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
    );
}

export default Recipes;