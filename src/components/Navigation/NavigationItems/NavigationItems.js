import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const navigationItems = props => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem
                link="/" exact>
                Αρχική
            </NavigationItem>
            <NavigationItem
                link="/courses">
                Μαθήματα
            </NavigationItem>
            <NavigationItem
                link="/stuff">
                Προσωπικό
            </NavigationItem>
            <NavigationItem
                link="/regulation">
                Κανονισμός Σπουδών
            </NavigationItem>
            {/* To be implemented in later phase */}
            {/*<NavigationItem*/}
            {/*    link="/info">*/}
            {/*    Πληροφορίες*/}
            {/*</NavigationItem>*/}
        </ul>
    );
};

export default navigationItems;