import React from 'react';
import classes from './Footer.module.css';
import FooterContent from './FooterContent/FooterContent';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const footer = props => (
    <footer className={classes.Footer}>
        <FooterContent clicked={props.showPrivacy}/>
        <div className={classes.Copyright}>&copy; Copyright Maritime Analytics 2020 - 21</div>
    </footer>
);

export default footer;