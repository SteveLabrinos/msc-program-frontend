import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Cockpit from '../../components/Cockpit/Cockpit';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { green, red } from '@material-ui/core/colors';
import { fetchEnrollCourses, enrollSelector, updateEnrollCourse } from './enrollCourseSlice';
import { fetchUsers, userSelector } from '../Users/userSlice';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 14/3/21.
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
    },
    fabRed: {
        color: theme.palette.common.white,
        backgroundColor: red[500],
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: red[600],
        },
    },
    styledRow: {
        backgroundColor: theme.palette.success.light
    }
}));


export default function EnrollCourses({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { enrollLoading, enrollCourses, courseTypes } = useSelector(enrollSelector);
    const { users } = useSelector(userSelector);

    //  async dispatch to fetch users
    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onFetchEnrollCourses = useCallback(() => {
        dispatch(fetchEnrollCourses(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (users.length === 0) {
            onFetchUsers();
        }
        if (enrollCourses.length === 0) {
            onFetchEnrollCourses();
        }
    }, [onFetchUsers, users.length, onFetchEnrollCourses, enrollCourses.length]);

    const handleUpdateEnrollCourse = useCallback((id, index, status) => {
        dispatch(updateEnrollCourse(id, index, status));
    }, [dispatch]);

    const mapTeacherName = teacherId => {
        const result = users.filter(u => u.id === teacherId)[0];
        return `${result.firstName} ${result.lastName}`;
    }

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const rowStyle = { backgroundColor: '#ccc' };

    const displayCourseList = enrollLoading ?
        <LoadingProgress /> :
        enrollCourses.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν καταχωρημένα μαθήματα για το Εξάμηνο φοίτησης
            </Typography> :
            users.length === 0 ?
                <LoadingProgress /> :
                <TableContainer component={Paper} className={classes.containerStyle}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Εξάμηνο</StyledTableCell>
                                <StyledTableCell align="center">Μάθημα</StyledTableCell>
                                <StyledTableCell align="center">Καθηγητής</StyledTableCell>
                                <StyledTableCell align="center">ECTS</StyledTableCell>
                                <StyledTableCell align="center">Τύπος</StyledTableCell>
                                <StyledTableCell align="center">Βαθμός</StyledTableCell>
                                <StyledTableCell align="center">Εγγραφή</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollCourses.map((course, index) => (
                                <TableRow
                                    className={course.grade && course.grade >= 5 ? classes.styledRow : null}
                                    style={!course.registrationId ? rowStyle: null}
                                    key={index}>
                                    <TableCell align="center">
                                        {`${course.season}o`}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {course.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {mapTeacherName(course.teacherId)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {course.ects}
                                    </TableCell>
                                    <TableCell align="center">
                                        {courseTypes.filter(t => t.code === course.type)[0].value}
                                    </TableCell>
                                    <TableCell align="center">
                                        {course.grade}
                                    </TableCell>
                                    <TableCell align="center">
                                        {!course.registrationId ?
                                            '' :
                                            course.status === 'REGISTERED' ?
                                                <Fab aria-label="update"
                                                     onClick={() => handleUpdateEnrollCourse(course.registrationId,
                                                         index, course.status)}
                                                     className={classes.fabRed}
                                                     size="small">
                                                    <HighlightOffIcon />
                                                </Fab> :
                                                <Fab aria-label="update"
                                                     onClick={() => handleUpdateEnrollCourse(course.registrationId,
                                                         index, course.status)}
                                                     className={classes.fabGreen}
                                                     size="small">
                                                    <AddIcon />
                                                </Fab>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>;

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Εγγραφές Μαθημάτων"/>
            <Container maxWidth="lg">
                {displayCourseList}
            </Container>
        </React.Fragment>
    );
}