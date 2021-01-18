import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography, CardMedia,
    CardContent, CardActionArea, Card  } from '@material-ui/core';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */




const Announcement = props => {
    // const styles = {
    //     reverse: props.reverse ? 'row-reverse' : 'row'
    // }
    const useStyles = makeStyles({
        root: {
            maxWidth: '100%',
            display: 'flex',
            margin: '2rem auto 1rem auto',
            flexDirection: props.reverse ? 'row-reverse' : 'row',
            textAlign: props.reverse ? 'right' : 'left'
        },
        media: {
            height: 100,
            width: 100,
            backgroundRepeat: 'no-repeat'
        },
        h5: {
            color: '#002d52'
        },
    });

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Hidden xsDown>
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={props.content.img}
                        alt={props.content.alt}
                        title="Εικόνα Ανακοίνωσης"
                    />
                </CardContent>
            </Hidden>
            <CardActionArea onClick={ props.clicked }>
                <CardContent>
                    <Typography className={classes.h5} gutterBottom variant="h5" component="h2">
                        {props.content.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Announcement;
