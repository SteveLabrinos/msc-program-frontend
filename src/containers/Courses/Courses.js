import React, {useState} from 'react';

import { coursesList } from '../../assets/statics/staticContent';
import Cockpit from '../../components/Cockpit/Cockpit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Container, Paper, TableContainer} from '@material-ui/core';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];


const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        marginBottom: '3rem',
    }
}));

export default function Courses() {

    const [courses, setCourses] = useState(coursesList);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Cockpit title="Μαθήματα" />
            <Container>
                <TableContainer component={Paper} className={classes.table}>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                {courses.headers.map(header => (
                                    <TableCell key={header.id} align="center">
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
                                    <TableCell align="left">{course.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
}