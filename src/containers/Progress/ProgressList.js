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
import Grid from '@material-ui/core/Grid';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

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
    },
    formControl: {
        minWidth: 250,
    },
    reportContainer: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(1)
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
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

    const [season, setSeason] = useState('1');

    const changeSeasonHandler = seasonNumber => {
        setSeason(seasonNumber);
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
            </TableContainer>;
    //  created link to students list as XSL for exercise 4 needs. staLab on 26/4/21.
    const studentList =
        <React.Fragment>
                <Typography variant="h5" component="h4" color="primary">
                    Εμφάνιση Λίστας Φοιτητών Εξαμήνου
                </Typography>
                <Grid container spacing={3} alignItems="center" className={classes.reportContainer}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="select-season-label">Εξάνημο</InputLabel>
                            <Select
                                labelId="select-season-label"
                                id="select-season"
                                fullWidth
                                value={season}
                                onChange={(event) => changeSeasonHandler(event.target.value)}
                            >
                                {seasons.map(type => (
                                    <MenuItem  key={type.code} value={type.code}>{type.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            href={`http://localhost/msc/season-report/${season}`}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.submit}
                        >
                            Εμφάνιση Λίστας
                        </Button>
                    </Grid>
                </Grid>
        </React.Fragment>;

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Πρόοδος Φοιτητών"/>
            <Container maxWidth="lg">
                {studentList}
                {displayUserList}
            </Container>
        </React.Fragment>
    );
}