import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css'

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const navigationItem = props => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
                 activeClassName={classes.active}
                 exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;