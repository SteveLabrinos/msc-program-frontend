import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './NavigationItem.module.css'

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

//  made the home link active from announcement page and its children Stavros Lamprinos 18/1/2021
const navigationItem = props => {
    const aClass = window.location.href
        .includes('/announcements') && props.home;

    return (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
                 className={aClass ? classes.active : null}
                 activeClassName={classes.active}
                 exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
    );
};

export default withRouter(navigationItem);