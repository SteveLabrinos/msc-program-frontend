import React from 'react';

import {Container, Typography} from '@material-ui/core';
import classes from './Cockpit.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */


const cockpit = props => {

    return (
        <Container maxWidth="md">
            <Typography className={classes.Title}
                        variant="h4">
                {props.title}
            </Typography>
        </Container>
    );
}

export default cockpit;