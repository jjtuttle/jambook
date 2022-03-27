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
                <ArrowCircleUpIcon style={{
                    position: "fixed",
                    bottom: "50px",
                    right: "250px",
                    height: "50px",
                    width: "50px",
                    
                }} 
                onClick={scrollUp}
                />
            )}
        </div>
    );
};

export default BackToTopButton;