import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../containers/Auth/authSlice';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

//  implemented authorization login to links
//  Stavros Lamprinos on 12/3/2021.
export default function NavigationItems() {
    const { token, role } = useSelector(authSelector);

    if (!token) {
        return <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact home>
                Αρχική
            </NavigationItem>
            <NavigationItem
                link="/courses">
                Μαθήματα
            </NavigationItem>
            <div className={classes.dropdown}>
                <button className={classes.dropBtn}>
                    Προσωπικό
                </button>
                <div className={classes.dropdownContent}>
                    <NavigationItem
                        link="/stuff/professor">
                        Διδάσκοντες
                    </NavigationItem>
                    <NavigationItem
                        link="/stuff/secretary">
                        Γραμματεία
                    </NavigationItem>
                </div>
            </div>
            <NavigationItem
                link="/regulation">
                Κανονισμός Σπουδών
            </NavigationItem>
        </ul>
    } else {
        switch (role) {
            case 'TEACHER':
                return <ul className={classes.NavigationItems}>
                    <NavigationItem link="/" exact home>
                        Αρχική
                    </NavigationItem>
                    <NavigationItem
                        link="/courses">
                        Μαθήματα
                    </NavigationItem>
                    <div className={classes.dropdown}>
                        <button className={classes.dropBtn}>
                            Προσωπικό
                        </button>
                        <div className={classes.dropdownContent}>
                            <NavigationItem
                                link="/stuff/professor">
                                Διδάσκοντες
                            </NavigationItem>
                            <NavigationItem
                                link="/stuff/secretary">
                                Γραμματεία
                            </NavigationItem>
                        </div>
                    </div>
                    <NavigationItem
                        link="/regulation">
                        Κανονισμός Σπουδών
                    </NavigationItem>
                </ul>
            case 'STUFF':
                return <ul className={classes.NavigationItems}>
                    <NavigationItem link="/" exact home>
                        Αρχική
                    </NavigationItem>
                    <NavigationItem
                        link="/users">
                        Χρήστες
                    </NavigationItem>
                    <NavigationItem
                        link="/courses-list">
                        Μαθήματα
                    </NavigationItem>
                    <div className={classes.dropdown}>
                        <button className={classes.dropBtn}>
                            Προσωπικό
                        </button>
                        <div className={classes.dropdownContent}>
                            <NavigationItem
                                link="/stuff/professor">
                                Διδάσκοντες
                            </NavigationItem>
                            <NavigationItem
                                link="/stuff/secretary">
                                Γραμματεία
                            </NavigationItem>
                        </div>
                    </div>
                    <NavigationItem
                        link="/regulation">
                        Κανονισμός Σπουδών
                    </NavigationItem>
                </ul>
            case 'STUDENT':
                return <ul className={classes.NavigationItems}>
                    <NavigationItem link="/" exact home>
                        Αρχική
                    </NavigationItem>
                    <NavigationItem
                        link="/courses">
                        Μαθήματα
                    </NavigationItem>
                    <div className={classes.dropdown}>
                        <button className={classes.dropBtn}>
                            Προσωπικό
                        </button>
                        <div className={classes.dropdownContent}>
                            <NavigationItem
                                link="/stuff/professor">
                                Διδάσκοντες
                            </NavigationItem>
                            <NavigationItem
                                link="/stuff/secretary">
                                Γραμματεία
                            </NavigationItem>
                        </div>
                    </div>
                    <NavigationItem
                        link="/regulation">
                        Κανονισμός Σπουδών
                    </NavigationItem>
                </ul>
            default:
                return null;
        }
    }
};