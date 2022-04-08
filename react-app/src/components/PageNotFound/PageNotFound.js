import React, { useEffect } from 'react';
import './PageNotFound.css';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import pageNotFound from '../../images/page-not-found-cassette-unspooled.jpg';
import logo from '../../images/jambook-logo-blue.png'

const PageNotFound = () => {
    const history = useHistory();


    // useEffect(() => {
    //     setTimeout(() => {
    //         history.push('/')
    //     }, 5000)
    // }, [ history ])


    return (
        <>
            <div>

                <img className="logo-page-not-found" src={logo} alt="logo"
                    style={{
                        width: '150px', height: '60px', position: 'absolute',
                        top: '17.5vh', right: '45vw', paddingBottom: '10px'
                    }}
                ></img>
                <h1 style={{ marginTop: '100px' }}>404 PAGE NOT FOUND</h1>
                <h3>Rewind me back... <NavLink to='/' style={{color:'blue'}}>Home</NavLink> </h3>
                {/* <h4 style={{ color: '#719ece' }}>or within 5 seconds you will be taken back</h4> */}
            </div>

            <div className="image-container">
                <img src={pageNotFound} alt="page not found" />
            </div>
        </>
    );
};

export default PageNotFound;