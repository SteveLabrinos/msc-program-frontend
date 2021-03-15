import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Cockpit from '../../components/Cockpit/Cockpit';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { green } from '@material-ui/core/colors';
import { gradeSelector, fetchGradeCourses } from './gradesSlice';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 15/3/21.
 */

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    containerStyle: {
        marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.down("md")]: {
        containerStyle: {
            marginTop: theme.spacing(2),
        }
    },
    fab: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: green[600],
        },
    }
}));


export default function GradesList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { gradeLoading, gradeCourses  } = useSelector(gradeSelector);

    const onFetchGradeCourses = useCallback(() => {
        dispatch(fetchGradeCourses(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (gradeCourses.length === 0) {
            onFetchGradeCourses();
        }
    }, [onFetchGradeCourses, gradeCourses.length]);

    const handleGradeStudents = id => {
        history.push(`grades/${id}`);
    };

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayCourseList = gradeLoading ?
        <LoadingProgress /> :
        gradeCourses.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν καταχωρημένα μαθήματα με υπεύθυνο καθηγητή εσάς
            </Typography> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Τίτλος</StyledTableCell>
                            <StyledTableCell align="center">Περιγραφή</StyledTableCell>
                            <StyledTableCell align="center">Εξάμηνο</StyledTableCell>
                            <StyledTableCell align="center">ECTS</StyledTableCell>
                            <StyledTableCell align="center">Φοιτητές</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeCourses.map(course => (
                            <StyledTableRow key={course.id}>
                                <TableCell component="th" scope="row" align="center">
                                    {course.title}
                                </TableCell>
                                <TableCell align="left">
                                    {course.description}
                                </TableCell>
                                <TableCell align="center">
                                    {`${course.season}o`}
                                </TableCell>
                                <TableCell align="center">
                                    {course.ects}
                                </TableCell>
                                <TableCell align="center">
                                    <Fab aria-label="update"
                                         onClick={() => handleGradeStudents(course.id)}
                                         className={classes.fabGreen}
                                         size="small">
                                        <VisibilityIcon />
                                    </Fab>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Μαθήματα"/>
            <Container maxWidth="lg">
                {displayCourseList}
            </Container>
        </React.Fragment>
    );
}