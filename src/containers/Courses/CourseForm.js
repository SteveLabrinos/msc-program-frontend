import { makeStyles } from '@material-ui/core';
import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 12/3/21.
 */


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 250,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
    create: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: green[500],
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: green[600],
        }
    },
    error: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    }
}));

export default function CourseForm(props) {
    const classes = useStyles();
    const {values, submit, change, courseTypes,
        courseId, deleteCourse, users } = props;

    return (
        <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        label="Τίτλος"
                        name="title"
                        placeholder="Συμπληρώστε Τίτλο"
                        autoComplete="title"
                        value={values.title}
                        autoFocus
                        onChange={change('title')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-teacher-label">Καθηγητής</InputLabel>
                        <Select
                            labelId="select-teacher-label"
                            id="select-teacher"
                            required
                            fullWidth
                            value={values.teacherId}
                            onChange={change('teacherId')}
                        >
                            {users.filter(u => u.role === 'TEACHER')
                                .map(user => (
                                <MenuItem  key={user.id} value={user.id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-type-label">Τύπος</InputLabel>
                        <Select
                            labelId="select-type-label"
                            id="select-type"
                            required
                            fullWidth
                            value={values.type}
                            onChange={change('type')}
                        >
                            {courseTypes.map(type => (
                                <MenuItem  key={type.code} value={type.code}>{type.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        id="description"
                        label="Περιγραφή"
                        name="description"
                        placeholder="Συμπληρώστε Περιγραφή"
                        autoComplete="description"
                        value={values.description}
                        onChange={change('description')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-season-label">Εξάμηνο</InputLabel>
                        <Select
                            labelId="select-season-label"
                            id="select-season"
                            required
                            fullWidth
                            value={values.season}
                            onChange={change('season')}
                        >
                            <MenuItem value={'1'}>1o Εξάμηνο</MenuItem>
                            <MenuItem value={'2'}>2o Εξάμηνο</MenuItem>
                            <MenuItem value={'3'}>3o Εξάμηνο</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        disabled
                        fullWidth
                        id="ects"
                        label="ECTS"
                        name="ects"
                        value={values.ects}
                        onChange={change('ects')}
                    />
                </Grid>
            </Grid>
            <Grid container justify={courseId ? 'space-between' : 'center'}>
                <Grid item xs={12} md={6} lg={4}>
                    {courseId ?
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Ενημέρωση Στοιχείων
                        </Button> :
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            className={classes.create}
                        >
                            Καταχώρηση Εγγραφής
                        </Button>
                    }
                </Grid>
                {courseId ?
                    <Grid item xs={12} md={3} lg={4}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={deleteCourse}
                            className={classes.error}
                        >
                            Διαγραφή Εγγραφής
                        </Button>
                    </Grid> : null
                }
            </Grid>
        </form>
    );
}