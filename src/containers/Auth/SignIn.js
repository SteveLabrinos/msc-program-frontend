import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { authSelector, login } from './authSlice';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoadingProgress from "../../components/UI/LoadingProgress/LoadingProgress";


/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

//  applied redux login for login Stavros Lamprinos [stalab at linuxmail.org] on 12/3/2021.
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff',
        backgroundColor: '#002d52'
    },
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { token, authError, authLoading } = useSelector(authSelector);

    //  state for input control
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = property => event => {
        setValues({ ...values, [property]: event.target.value });
    };

    //  callback function for login
    const handleLogin = useCallback(event => {
        event.preventDefault();
        dispatch(login(values));
    }, [values, dispatch]);

    const errorMsg = authError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon style={{ fontSize: 22 }} />
            {authError}
        </Typography> : null;

    const authRedirect = token ? <Redirect to="/" /> : null;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon htmlColor="#fff"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Είσοδος
                </Typography>
                {authRedirect}
                {errorMsg}
                {authLoading ?
                    <LoadingProgress /> :
                    <form className={classes.form} onSubmit={handleLogin} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Διεύθυνση Email"
                            name="email"
                            placeholder="Συμπληρώστε το Email ..."
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange('email')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Κωδικός"
                            type="password"
                            id="password"
                            onChange={handleChange('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            ΣΥΝΔΕΣΗ
                        </Button>
                    </form>
                }
            </div>
        </Container>
    );
}