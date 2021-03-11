import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../img/logo_footer.png'
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__logo">
                    <img src={Logo} alt='footer logo' />
                </div>
                <div className="footer__content">
                    © The Fineapple Co. 
                </div>

            </div>


        </div>

    )
}

export default Footer;
