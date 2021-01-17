import React from 'react';
import {
    Typography, CardMedia, CardContent,
    Link, Card, useMediaQuery
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import '../../assets/images/stuff/s1.jfif'

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */

const Stuff = props => {
    // const styles = {
    //     reverse: props.reverse ? 'row-reverse' : 'row'
    // }
    const useStyles = makeStyles({
        root: {
            maxWidth: '100%',
            // display: 'flex',
            // flexDirection: 'row',
            margin: '2rem auto 1rem auto',
        },
        media: {
            height: 150,
            width: 100,
            borderRadius: '4px',
            backgroundRepeat: 'no-repeat'
        },
        h5: {
            color: '#002d52'
        },
    });

    const classes = useStyles();

    const matches = useMediaQuery('(min-width: 700px)');

    const cardStyle = {
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

    return (
        <Card className={classes.root}>
            <CardContent style={cardStyle}>
                    <CardMedia
                        className={classes.media}
                        image={props.content.img}
                        alt={props.content.alt}
                        title="Εικόνα Προφίλ Προσωπικού ΠΜΣ"
                    />
                <Typography className={classes.h5}
                            gutterBottom
                            variant="h4"
                            component="p"
                            color="textPrimary">
                    {`${props.content.firstName} ${props.content.lastName}`}
                </Typography>
                <Link variant="h4" color="textSecondary" href={'mailto:' + props.content.email}>
                    {props.content.email}
                </Link>
                <Link variant="h4" color="textSecondary" href={'tel:' + props.content.phone}>
                    {props.content.phone}
                </Link>
            </CardContent>
        </Card>
    );
}

export default Stuff;
