import React from 'react';
import './PageNotFound.css';
import pageNotFound from '../../images/page-not-found-cassette-unspooled.jpg';


const PageNotFound = () => {
    // todo ————————————————————————————————————————————————————————————————————————
    return (
        <div>
            <h1 style={{textAlign:'center'}}>404 PAGE NOT FOUND</h1>
            <span><h3>Rewind me back...</h3></span>
            <div className="image-container">
                <img src={pageNotFound} alt="page not found" />
            </div>
        </div>
    );
};

export default PageNotFound;