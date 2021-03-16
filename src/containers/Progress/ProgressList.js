import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Cockpit from '../../components/Cockpit/Cockpit';
import Container from '@material-ui/core/Container';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { green } from '@material-ui/core/colors';
import { fetchUsers, userSelector } from '../Users/userSlice';
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
 * @author Stavros Labrinos [stalab at linuxmail.org] on 12/3/21.
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

const seasons = [
    {code: '1', value: '1o Εξάμηνο'},
    {code: '2', value: '2o Εξάμηνο'},
    {code: '3', value: '3o Εξάμηνο'},
];


export default function ProgressList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { userLoading, users } = useSelector(userSelector);

    //  async dispatch to fetch users
    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (users.length === 0) {
            onFetchUsers();
        } else {
            setStudents(users.filter(u => u.role === 'STUDENT'));
        }
    }, [onFetchUsers, users]);

    const handleShowProgress = id => {
        history.push(`progress/${id}`);
    };

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayUserList = userLoading ?
        <LoadingProgress /> :
        students.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν καταχωρημένοι μαθητές
            </Typography> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Όνομα</StyledTableCell>
                            <StyledTableCell align="center">Επώνυμο</StyledTableCell>
                            <StyledTableCell align="center">Α.Μ.</StyledTableCell>
                            <StyledTableCell align="center">Πρόοδος</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {seasons.map(season => (
                            <React.Fragment key={season.code}>
                                <TableRow>
                                    <StyledTableCell
                                        style={{ backgroundColor: '#303f9f', color: '#fff' }}
                                        colSpan={4} align="center">
                                        {season.value}
                                    </StyledTableCell>
                                </TableRow>
                                {students
                                    .filter(st => st.seasonNumber === season.code)
                                    .map(user => (
                                        <StyledTableRow key={user.id}>
                                            <TableCell component="th" scope="row" align="center">
                                                {user.firstName}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.lastName}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.registrationNumber}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Fab aria-label="update"
                                                     onClick={() => handleShowProgress(user.id)}
                                                     className={classes.fabGreen}
                                                     size="small">
                                                    <VisibilityIcon />
                                                </Fab>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Πρόοδος Φοιτητών"/>
            <Container maxWidth="lg">
                {displayUserList}
            </Container>
        </React.Fragment>
    );
}