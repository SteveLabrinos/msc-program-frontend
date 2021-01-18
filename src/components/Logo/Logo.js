import React from 'react';
import {Link} from 'react-router-dom';

import edulLogo from '../../assets/images/Educational-Logo.png';
import eapImg from '../../assets/images/eap-logo.png'
import classes from './Logo.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 14/1/2021.
 */

const logo = props => {
    let preferences = {link: '/'}

    switch (props.logoType) {
        case ('appLogo'):
            preferences.src = edulLogo;
            preferences.alt = 'Applications education logo';
            break;
        case('eapLogo'):
            preferences.link = 'https://www.eap.gr';
            preferences.src = eapImg;
            preferences.target = '_black';
            preferences.rel = 'noreferrer';
            preferences.alt = 'Logo of Hellenic Open University';
            break;
        default:
            break;
    }

    const link = props.logoType === 'eapLogo' ?
        <a href={preferences.link}
           target={preferences.target}
           rel={preferences.rel}>
            <img src={preferences.src}
                 alt={preferences.alt}
                 height="40%"
                 width="40%"/>
        </a> :
        <Link to={preferences.link}>
            <img src={preferences.src}
                 alt={preferences.alt}/>
        </Link>

    return (
        <div className={classes.Logo}>
            {link}
        </div>
    );
};

export default logo;