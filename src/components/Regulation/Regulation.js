import React from 'react';

import { reg } from '../../assets/statics/staticContent';
import { Link } from 'react-router-dom';
import Cockpit from '../Cockpit/Cockpit';
import { Container, Typography } from '@material-ui/core';
import { FaFilePdf } from 'react-icons/all';

import classes from './Regulation.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */

const regulation = () => (
    <React.Fragment>
        <Cockpit title={reg.title} />
        <Container className={classes.Container}>
            <Typography variant="body1" color="textPrimary" component="article">
                {reg.article}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Για Πρόγραμμα Μεταπτυχιακών Σπουδών <em>"Πληροφοριακά Συστήματα"</em> έχει
                εκδοθεί ο ακόλουθος
                <span className={classes.Link}>
                    <Link to={reg.link}
                          target="_blank"
                          rel="noreferrer">
                         Οδηγός Σπουδών 2020-21
                        <FaFilePdf style={{paddingLeft: '.1rem'}}/>
                    </Link>
                </span>

            </Typography>
        </Container>
    </React.Fragment>
);

export default regulation;