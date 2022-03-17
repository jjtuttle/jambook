import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Homepage.css';

// todo ————————————————————————————————————————————————————————————————————————
const Homepage = () => {
    return (
        <>
            <NavBar />
            <div>
                <h1>** NEW HOMEPAGE **</h1>
                <div className="form">
                    <form>
                        <textarea name="post" id="" cols="30" rows="5" placeholder="Start a session..." style={{ borderRadius: '5px' }} />
                        <div className="button">
                            <button type="button">
                                Post
                            </button>
                        </div>
                    </form>
                    <div className="post-container">
                        {}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;