import React from 'react';
import classes from './Footer.module.css';
import FooterContent from './FooterContent/FooterContent';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const footer = props => (
    <footer className={classes.Footer}>
        <FooterContent clickedPrivacy={props.showPrivacy}
                       clickedTerms={props.showTerms}/>
        <div className={classes.Copyright}>&copy; Copyright MSc Information Systems 2020 - 21</div>
    </footer>
);

export default footer;