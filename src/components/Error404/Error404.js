import React from 'react';

import Cockpit from '../Cockpit/Cockpit';
import { Button, Typography, Container } from '@material-ui/core';
import classes from '../Announcements/Announcements.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 18/1/2021.
 */

const error404 = props => {

    const handleErrorRedirect = () => {
        props.history.push('/');
    }

    return(
        <React.Fragment>
            <Cockpit title="Η σελίδα δεν βρέθηκε"/>
            <Container className={classes.Root}>
                <Typography gutterBottom variant="h3" component="p">
                    Σφάλμα 404. Η σελίδα που αναζητήσατε δεν βρέθηκε
                </Typography>
                <Button size="large"
                        onClick={ handleErrorRedirect }
                        variant="contained"
                        className={classes.Button}>
                    ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ
                </Button>
            </Container>
        </React.Fragment>
    );
};

export default error404;