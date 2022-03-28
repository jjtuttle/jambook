import React from 'react';
import './PageNotFound.css';
import pageNotFound from '../../images/page-not-found-cassette-unspooled.jpg';
import logo from '../../images/jambook-logo-blue.png'

const PageNotFound = () => {
    // todo ————————————————————————————————————————————————————————————————————————
    return (
        <>
            <div>
                
                <img className="logo-page-not-found" src={logo} alt="logo"
                    style={{
                        width: '150px', height: '60px', position: 'absolute',
                        top: '17.5vh', right: '45vw', paddingBottom:'10px'
                    }}
                ></img>
                <h1 style={{marginTop:'100px'}}>404 PAGE NOT FOUND</h1>
                <h3>Rewind me back... Hit the back button </h3>
            </div>

            <div className="image-container">
                <img src={pageNotFound} alt="page not found" />
            </div>
        </>
    );
};

export default PageNotFound;