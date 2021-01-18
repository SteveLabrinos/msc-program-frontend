import React, {useState, useEffect} from 'react';

import {coursesList} from '../../assets/statics/staticContent';
import Cockpit from '../../components/Cockpit/Cockpit';
import Spinner from '../../components/UI/Spinner/Spinner';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Container, Paper, TableContainer} from '@material-ui/core';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    head: {
        color: '#002d52',
        fontSize: '1.1rem'
    },
    body: {
        color: 'black'
    }
}));

export default function Courses() {

    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        //  static data loading until backend logic is implemented
        setCourses(coursesList);
        setLoading(false);
    }, [courses]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Cockpit title="Μαθήματα"/>
            {loading ?
                <Spinner/> :
                <Container>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    {courses.headers.map(header => (
                                        <TableCell key={header.id} align="center" variant="head"
                                                   className={classes.head}>
                                            {header.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.courses.map(course => (
                                    <TableRow key={course.id}>
                                        <TableCell align="center">{course.time}</TableCell>
                                        <TableCell align="left">{course.name}</TableCell>
                                        <TableCell align="center">{course.teacher}</TableCell>
                                        <TableCell align="center">{course.units}</TableCell>
                                        <TableCell align="left"
                                                   style={{
                                                       color: course.type === 'Βασικό' ?
                                                           '#002d52' : 'green'
                                                   }}>
                                            {course.type}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            }
        </React.Fragment>
    );
}