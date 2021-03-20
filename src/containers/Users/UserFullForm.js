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
 * @author Stavros Labrinos [stalab at linuxmail.org] on 16/3/21.
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

export default function UserFullForm(props) {
    const classes = useStyles();
    const {values, submit, change, roleTypes } = props;

    return (
        <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        disabled
                        fullWidth
                        id="firstName"
                        label="Όνομα"
                        name="firstName"
                        placeholder="Συμπληρώστε Όνομα"
                        autoComplete="firstName"
                        value={values.firstName}
                        autoFocus
                        onChange={change('firstName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        disabled
                        fullWidth
                        id="lastName"
                        label="Επώνυμο"
                        name="lastName"
                        placeholder="Συμπληρώστε Επώνυμο"
                        autoComplete="lastName"
                        value={values.lastName}
                        onChange={change('lastName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        disabled
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        placeholder="Συμπληρώστε E-mail"
                        autoComplete="email"
                        value={values.email}
                        onChange={change('email')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl required disabled fullWidth className={classes.formControl}>
                        <InputLabel id="select-role-label">Τύπος</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            required
                            fullWidth
                            value={values.role}
                            onChange={change('role')}
                        >
                            {roleTypes.map(type => (
                                <MenuItem  key={type.code} value={type.code}>{type.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth disabled className={classes.formControl}>
                        <InputLabel id="select-student-season-label">Εξάμηνο</InputLabel>
                        <Select
                            labelId="select-student-season-label"
                            id="select-student-season"
                            fullWidth
                            value={values.seasonNumber}
                            onChange={change('seasonNumber')}
                        >
                            <MenuItem value={''}>Επιλέξτε</MenuItem>
                            <MenuItem value={'1'}>1o Εξάμηνο</MenuItem>
                            <MenuItem value={'2'}>2o Εξάμηνο</MenuItem>
                            <MenuItem value={'3'}>3o Εξάμηνο</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        inputProps={{ minLength: 8 }}
                        fullWidth
                        type="password"
                        id="password"
                        label="Νέος Κωδικός"
                        name="password"
                        placeholder="Συμπληρώστε Νέο Κωδικό"
                        value={values.password}
                        onChange={change('password')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        id="password"
                        label="Τηλέφωνο"
                        name="phone"
                        placeholder="Συμπληρώστε Τηλέφωνο"
                        value={values.phone}
                        onChange={change('phone')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        id="password"
                        label="Διεύθυνση"
                        name="address"
                        placeholder="Συμπληρώστε Διεύθυνση"
                        value={values.address}
                        onChange={change('address')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="birth-date"
                        label="Ημερομηνία Γέννησης"
                        type="date"
                        fullWidth
                        value={values.birthDate}
                        onChange={change('birthDate')}
                        placeholder="Συμπληρώστε Ημερομηνία Γέννησης"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={12} md={6} lg={4}>
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ενημέρωση Στοιχείων
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}