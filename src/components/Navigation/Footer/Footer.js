import React from 'react';
import classes from './Footer.module.css';
import FooterContent from './FooterContent/FooterContent';
import { Typography } from '@material-ui/core';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

function Copyright() {
    return (
        <Typography variant="body2" align="center" style={{color: '#fff'}}>
            {'Copyright © MSc Information Systems '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const footer = props => (
    <footer className={classes.Footer}>
        <FooterContent clickedPrivacy={props.showPrivacy}
                       clickedTerms={props.showTerms}/>
        <Copyright />
    </footer>
);

export default footer;