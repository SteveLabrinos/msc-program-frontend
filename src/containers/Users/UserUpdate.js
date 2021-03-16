import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { clearUserError, userSelector, updateUser, fetchUsers } from './userSlice';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import UserFullForm from './UserFullForm';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 16/3/21.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarUpdate: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    avatarCreate: {
        margin: theme.spacing(1),
        backgroundColor: green[500],
    },
    link: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
}));

export default function UserUpdate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { userError, userLoading, created, roleTypes, users } = useSelector(userSelector);

    const [userId, setUserId] = useState(null);

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        seasonNumber: '',
        phone: '',
        address: '',
        birthDate: '',
    });

    const handleChange = property => event => {
        if (userError) dispatch(clearUserError());
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSubmitUser = useCallback(event => {
        event.preventDefault();
        dispatch(updateUser(values, token, userId));
    }, [userId, dispatch, token, values]);

    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (params.id && !created) {
            setUserId(params.id);
            if (users.length !== 0) {
                let selectedUser = users.filter(u => u.id === Number.parseInt(params.id));

                if (selectedUser.length >0) {
                    selectedUser = selectedUser[0];
                    const { firstName, lastName, email, role,
                        seasonNumber, phone, address, birthDate } = selectedUser;
                    setValues({
                        firstName,
                        lastName,
                        email,
                        role,
                        password: '',
                        seasonNumber,
                        phone,
                        address,
                        birthDate
                    });
                }
            } else {
                onFetchUsers();
            }
        }
    }, [created, params.id, dispatch, users, onFetchUsers]);

    //  display data
    const errorMsg = userError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/sign-in"/> : null;

    //  redirect to home page after updating user fields
    const createdRedirect = created ?
        <Redirect to="/"/> : null;

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {userId ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    Επεξεργασία Στοιχείων
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {userLoading ?
                    <LoadingProgress /> :
                    <UserFullForm
                        change={handleChange}
                        roleTypes={roleTypes}
                        values={values}
                        userId={userId}
                        submit={handleSubmitUser} />
                }
            </div>
        </Container>
    );
}

