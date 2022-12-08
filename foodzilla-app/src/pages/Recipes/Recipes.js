import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Col } from 'react-bootstrap';
import './Recipes.css'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import SideBar from '../../components/SideBar';


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
            setData(response.data.results);
            setFlag(true);
        }).catch(function (error) {
            console.error(error);
        });

    }

    return (
        <>
            <SideBar />
            <br />
            <h2>Tasty Recipes</h2>
            <div className='recipefeed'>
                {flag === false ? <div className='loader'><Spinner animation="border" variant="dark" /></div> :
                    data !== undefined && data.length !== 0 ?
                        data.map((d) => {
                            return (
                                <>
                                    <Card className="recipes">
                                        <Card.Header>{d.name}<br /></Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <>
                                                    {d.recipes ?
                                                        d.recipes.map(r => {
                                                            return (
                                                                <>
                                                                    {r.name}<br />
                                                                    {r.description}
                                                                    <br />
                                                                    <img src={r.thumbnail_url} alt={r.thumbnail_alt_text} width="500px" height="300px" className='foodimg'/>
                                                                    <br />
                                                                    {r.prep_time_minutes ? "Preparation time:" + r.prep_time_minutes : null}
                                                                    <br />
                                                                    {r.yields}
                                                                    <br /><br />
                                                                    {r.instructions ? "Instructions:" : null}
                                                                    <ol>
                                                                        {r.instructions?.map((i) => { return (<li style={{ color: "black", textAlign: "left" }}>{i.display_text}<br /></li>) })}
                                                                    </ol>
                                                                    {r.user_ratings ? r.user_ratings.score !== null ? "User Rating: " + (r.user_ratings.score * 100) + '%' : null : null}
                                                                </>
                                                            )
                                                        }
                                                        ) : (<>
                                                            {d.description}
                                                            <br />
                                                            <img src={d.thumbnail_url} alt={d.thumbnail_alt_text} width="500px" height="300px" className='foodimg'/>
                                                            <br />
                                                            {d.prep_time_minutes ? "Preparation time:" + d.prep_time_minutes : null}
                                                            <br />
                                                            {d.yields}
                                                            <br /><br />
                                                            {d.instructions ? "Instructions:" : null}
                                                            <ol>
                                                                {d.instructions?.map((i) => { return (<li style={{ color: "black", textAlign: "left" }}>{i.display_text}<br /></li>) })}
                                                            </ol>
                                                            {d.user_ratings ? d.user_ratings.score !== null ? "User Rating: " + (d.user_ratings.score * 100) + '%' : null : null}
                                                        </>)
                                                    }</>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </>
                            )
                        })
                        : null}
            </div>

        </>
    );
}

export default Recipes;