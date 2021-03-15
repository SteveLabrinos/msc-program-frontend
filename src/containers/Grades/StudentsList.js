import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Cockpit from '../../components/Cockpit/Cockpit';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { green } from '@material-ui/core/colors';
import { gradeSelector, fetchGradeStudents, updateGrade } from './gradesSlice';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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

const gradesArray = [ 1,2,3,4,5,6,7,8,9,10 ];


export default function StudentsList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { gradeLoading, gradeStudents  } = useSelector(gradeSelector);

    const onFetchGradeStudents = useCallback(() => {
        dispatch(fetchGradeStudents(token, params.id));
    }, [dispatch, token, params.id]);

    useEffect(() => {
        if (gradeStudents.length === 0) {
            onFetchGradeStudents();
        }
    }, [onFetchGradeStudents, gradeStudents.length]);

    const handleUpdateGrade = useCallback((registrationId, grade, index) => {
        dispatch(updateGrade(registrationId, grade, index, params.id, token));
    }, [dispatch, params.id, token]) ;

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayStudentList = gradeLoading ?
        <LoadingProgress /> :
        gradeStudents.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν εγγεγραμμένοι φοιτητές στο μάθημά σας
            </Typography> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Ονοματεπώνυμο</StyledTableCell>
                            <StyledTableCell align="center">Α.Μ.</StyledTableCell>
                            <StyledTableCell align="center">Βαθμός</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeStudents.map((student, index) => (
                            <StyledTableRow key={student.id}>
                                <TableCell component="th" scope="row" align="left">
                                    {`${student.firstName} ${student.lastName}`}
                                </TableCell>
                                <TableCell align="center">
                                    {student.registrationNumber}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl required fullWidth>
                                        <InputLabel id="select-grade-label">Βαθμός</InputLabel>
                                        <Select
                                            labelId="select-grade-label"
                                            id="select-grade"
                                            required
                                            fullWidth
                                            value={student.grade}
                                            onChange={(event) =>
                                                handleUpdateGrade(student.registrationId, event.target.value, index)}
                                        >
                                            {gradesArray.map(grade => (
                                                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Εγγεγραμμένοι Φοιτητές"/>
            <Container maxWidth="lg">
                {displayStudentList}
            </Container>
        </React.Fragment>
    );
}