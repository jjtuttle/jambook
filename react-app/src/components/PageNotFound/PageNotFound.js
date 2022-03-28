import React from 'react';
import './PageNotFound.css';
import pageNotFound from '../../images/page-not-found-cassette-unspooled.jpg';


const PageNotFound = () => {
    // todo ————————————————————————————————————————————————————————————————————————
    return (
        <>
            <div style={{top:'40vh'}}>
                <h1>404 PAGE NOT FOUND</h1>
                <h3>Rewind me back... Hit the back button </h3>
            </div>

            <div className="image-container">
                <img src={pageNotFound} alt="page not found" />
            </div>
        </>
    );
};

export default PageNotFound;