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
import { fetchCourses, courseSelector, clearCreated } from './courseSlice';
import { fetchUsers, userSelector } from '../Users/userSlice';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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


export default function CourseList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { courseLoading, courses, courseTypes, created } = useSelector(courseSelector);
    const { users } = useSelector(userSelector);

    //  async dispatch to fetch users
    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onFetchCourses = useCallback(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    useEffect(() => {
        if (users.length === 0) {
            onFetchUsers();
        }
        if (courses.length === 0) {
            onFetchCourses();
        }
    }, [onFetchUsers, users.length, onFetchCourses, courses.length]);

    const handleUpdateCourse = id => {
        if (created) dispatch(clearCreated());
        history.push(id ? `courses/update/${id}` : `courses/new`);
    };

    const mapTeacherName = teacherId => {
        const result = users.filter(u => u.id === teacherId)[0];
        return `${result.firstName} ${result.lastName}`;
    }

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayCourseList = courseLoading ?
        <LoadingProgress /> :
        courses.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν καταχωρημένα μαθήματα για το Μεταπτυχιακό Πρόγραμμα Σπουδών
            </Typography> :
            users.length === 0 ?
                <Typography variant="h5" component="p">
                    Δεν έχουν καταχωρηθεί καθηγητές για τα μαθήματα
                </Typography> :
                <TableContainer component={Paper} className={classes.containerStyle}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Τίτλος</StyledTableCell>
                                <StyledTableCell align="center">Καθηγητής</StyledTableCell>
                                <StyledTableCell align="center">Περιγραφή</StyledTableCell>
                                <StyledTableCell align="center">Τύπος</StyledTableCell>
                                <StyledTableCell align="center">Εξάμηνο</StyledTableCell>
                                <StyledTableCell align="center">ECTS</StyledTableCell>
                                <StyledTableCell align="center">Τροποποίηση</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map(course => (
                                <StyledTableRow key={course.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        {course.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {mapTeacherName(course.teacherId)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {course.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {courseTypes.filter(t => t.code === course.type)[0].value}
                                    </TableCell>
                                    <TableCell align="center">
                                        {`${course.season}o`}
                                    </TableCell>
                                    <TableCell align="center">
                                        {course.ects}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Fab aria-label="update"
                                             onClick={() => handleUpdateCourse(course.id)}
                                             className={classes.fabGreen}
                                             size="small">
                                            <EditIcon />
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
            <Cockpit title="Εισαγωγή / Τροποποίηση Μαθημάτων"/>
            <Container maxWidth="lg">
                <Fab color="primary"
                     className={classes.fab}
                     aria-label="add"
                     onClick={() => handleUpdateCourse(null)} >
                    <AddIcon />
                </Fab>
                {displayCourseList}
            </Container>
        </React.Fragment>
    );
}