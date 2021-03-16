import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../UI/Title/Title';
import { getMonthName } from '../../shared/utility';
import Grid from '@material-ui/core/Grid';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 16/3/2021.
 */

const useStyles = makeStyles(theme => ({
    depositContext: {
        marginBottom: theme.spacing(3)
    },
    statisticsDisplay: {
        display: 'flex'
    },
    resultDisplay: {
        paddingLeft: theme.spacing(1)
    }
}));

const getCurrentDate = () => {
    const date = new Date();
    return `${getMonthName(date.getMonth())}, ${date.getFullYear()}`
}

export default function Statistics(props) {
    const classes = useStyles();

    const { title, statistics } = props;

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography color="textPrimary" className={classes.depositContext} variant="h5">
                {getCurrentDate()}
            </Typography>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Μαθήματα που έχουν δηλωθεί:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.enrolls}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Εξάμηνο:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.season}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Βασικά Μαθήματα με Προβιβάσιμο Βαθμό:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.mandatoryCourses}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Μαθήματα Επιλογής με Προβιβάσιμο Βαθμό:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.nonMandatoryCourses}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Διδακτικές Μονάδες:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.totalEcts}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Βασικά Μαθήματα για Πτυχίο:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.remainingMandatoryCourses}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Μαθήματα Επιλογής για Πτυχίο:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.remainingNonMandatoryCourses}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className={classes.statisticsDisplay}>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                        Διδακτικές Μονάδες για Πτυχίο:
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="primary" className={classes.resultDisplay}>
                        {statistics.remainingEcts}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}