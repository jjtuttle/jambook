import React from 'react';
import { useEffect, useState } from 'react';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const BackToTopButton = () => {

    const [ backToTopButton, setBackToTopButton ] = useState(false);


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        });
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };


    return (
        <div>
            {backToTopButton && (
                <ArrowCircleUpIcon className='backToTopArrow'
                style={{
                    position: "fixed",
                    bottom: "5vh",
                    right: "20vw",
                    height: "50px",
                    width: "50px",
                        // transition: '0.5s ease-in -out',
                    animation: "rotation 2s  linear"
                    // animation: 'loader 5s infinite'
                }} 
                onClick={scrollUp}
                />
            )}
        </div>
    );
};

export default BackToTopButton;