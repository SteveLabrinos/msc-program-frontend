import React from 'react';

import { Container, Button } from '@material-ui/core';
import Announcement from './Announcement/Announcement';

import classes from './Announcements.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 15/1/2021.
 */


const announcements = props => {
    const root = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'noWrap',
        justifyItems: 'center',
        alignItems: 'center'
    }

    return (
        <Container style={root} className={classes.Root}>
            {props.content.map((announcement, index) => (
            <Announcement content={ announcement }
                          key={ announcement.id }
                          clicked={ () => props.continueFullAnnouncement(announcement.id) }
                          reverse={ index % 2 !== 0 }/>
            ))}
            { props.showBtn ?
                <Button size="large"
                        onClick={ props.continueAnnouncements }
                        variant="contained"
                        className={ classes.Button }>
                    ΟΛΕΣ ΟΙ ΑΝΑΚΟΙΝΩΣΕΙΣ
                </Button> : null }
        </Container>

    );
}

export default announcements;