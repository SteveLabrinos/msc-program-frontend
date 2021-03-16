import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cockpit from '../../components/Cockpit/Cockpit';
import Container from '@material-ui/core/Container';
import { enrollSelector, fetchStatistics } from '../Enroll/enrollCourseSlice';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import Paper from '@material-ui/core/Paper';
import Statistics from '../../components/Statistics/Statistics';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 16/3/21.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 240,
        marginBottom: theme.spacing(3)
    },
}));


export default function StudentProgress({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { statistics, statisticsLoading } = useSelector(enrollSelector);


    const onFetchStatistics = useCallback(() => {
        dispatch(fetchStatistics(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        // if (!statistics) onFetchStatistics();
        onFetchStatistics()
    }, [onFetchStatistics]);

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayStatistics = statisticsLoading || !statistics ?
        <LoadingProgress /> :
        <Paper className={classes.paper}>
            <Statistics title="Στατιστικά Στοιχεία" statistics={statistics} />
        </Paper>;

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Πρόοδος Φοιτητή"/>
            <Container maxWidth="lg">
                {displayStatistics}
            </Container>
        </React.Fragment>
    );
}