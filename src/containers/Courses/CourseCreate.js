import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { clearCourseError, courseSelector, createCourse,
    updateCourse, deleteCourse } from './courseSlice';
import { userSelector, users, fetchUsers } from '../Users/userSlice';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import CourseForm from './CourseForm';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 14/3/21.
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

export default function CourseCreate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { courseError, courseLoading, created, courseTypes, courses } = useSelector(courseSelector);
    const { users, userLoading } = useSelector(userSelector);

    const [courseId, setCourseId] = useState(null);

    const [values, setValues] = useState({
        title: '',
        teacherId: '',
        type: '',
        description: '',
        season: '',
        ects: 5
    });

    const handleChange = property => event => {
        if (courseError) dispatch(clearCourseError());
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSubmitCourse = useCallback(event => {
        event.preventDefault();

        console.log(values);

        courseId ? dispatch(updateCourse(values, token, courseId)) : dispatch(createCourse(values, token));
    }, [courseId, dispatch, token, values]);

    const handleDeleteCourse = useCallback(event => {
        event.preventDefault();

        dispatch(deleteCourse(token, courseId));
    }, [dispatch, courseId, token]);

    //  async dispatch to fetch users
    const onFetchUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (params.id && !created) {
            setCourseId(Number.parseInt(params.id));
            let selectedCourse = courses.filter(c => c.id === Number.parseInt(params.id));

            if (selectedCourse.length >0) {
                selectedCourse = selectedCourse[0];
                const { teacherId, title, type, season, description, ects } = selectedCourse;
                setValues({
                    teacherId,
                    title,
                    type,
                    season,
                    description,
                    ects
                });
            }
        }
        if (users.length === 0) {
            onFetchUsers();
        }
    }, [created, params.id, dispatch, courses, onFetchUsers, users.length]);

    //  display data
    const errorMsg = courseError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/sign-in"/> : null;

    const createdRedirect = created ?
        <Redirect to="/courses-list"/> : null;

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {courseId ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {courseId ? 'Επεξεργασία Μαθήματος' :
                        'Δημιουργία Μαθήματος'
                    }
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {courseLoading || userLoading ?
                    <LoadingProgress /> :
                    <CourseForm
                        change={handleChange}
                        courseTypes={courseTypes}
                        values={values}
                        users={users}
                        courseId={courseId}
                        deleteCourse={handleDeleteCourse}
                        submit={handleSubmitCourse}/>
                }
            </div>
        </Container>
    );
}

