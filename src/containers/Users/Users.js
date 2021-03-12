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
import { fetchUsers, userSelector, clearCreated} from './userSlice';
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


export default function Users({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { userLoading, users, roleTypes, created } = useSelector(userSelector);

    //  async dispatch to fetch users
    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length === 0) {
            onFetchUsers();
        }
    }, [onFetchUsers, users.length]);

    const handleUpdateUser = id => {
        if (created) dispatch(clearCreated());
        history.push(id ? `users/update/${id}` : `users/new`);
    };

    const authRedirect = !token? <Redirect to="/sign-in" /> : null;

    const displayUserList = userLoading ?
        <LoadingProgress /> :
        users.length === 0 ?
            <Typography variant="h5" component="p">
                Δεν βρέθηκαν καταχωρημένοι χρήστες
            </Typography> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Όνομα</StyledTableCell>
                            <StyledTableCell align="center">Επώνυμο</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Τύπος</StyledTableCell>
                            <StyledTableCell align="center">Α.Μ.</StyledTableCell>
                            <StyledTableCell align="center">Τροποποίηση</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <StyledTableRow key={user.id}>
                                <TableCell component="th" scope="row" align="center">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.lastName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {roleTypes.filter(t => t.code === user.role)[0].value}
                                </TableCell>
                                <TableCell align="center">
                                    {user.registrationNumber}
                                </TableCell>
                                <TableCell align="center">
                                    <Fab aria-label="update"
                                         onClick={() => handleUpdateUser(user.id)}
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
            <Cockpit title="Εισαγωγή / Τροποποίηση Χρηστών"/>
            <Container maxWidth="lg">
                <Fab color="primary"
                     className={classes.fab}
                     aria-label="add"
                     onClick={() => handleUpdateUser(null)} >
                    <AddIcon />
                </Fab>
                {displayUserList}
            </Container>
        </React.Fragment>
    );
}