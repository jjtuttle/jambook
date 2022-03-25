import React from 'react';
import { useState, useEffect } from 'react';
import './Footer.css';


const Footer = () => {

    const [ date, setDate ] = useState();

    const getYear = () => setDate(new Date().getFullYear())


    useEffect(() => {
        getYear();
    }, [])



    return (
        <div className="footer_container">
            <div className="hr">
                <hr style={{ width: '100%' }} />
            </div>
            <div className="footer__text">
                <p className='footer__text__list'>
                    Python Flask PostgreSQL Node.JS HTML5 CSS React-Hooks Redux Redux Git SQLAlchemy npm
                </p>
            </div>

            <div className="footer__copyright">
                Developed by: James Tuttle &copy; - {date}
            </div>
        </div>
    );
};

export default Footer;


{/* <svg width="178px" height="44px" viewBox="0 0 178 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="Klavika-Bold, Klavika" font-size="48" font-weight="bold">
        <g id="login-splash" transform="translate(-79.000000, -216.000000)" fill="#1877F2" fill-rule="nonzero">
            <text id="jambook">
                <tspan x="80" y="250">jambook</tspan>
            </text>
        </g>
    </g>
</svg> */}