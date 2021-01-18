import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolbarInfo from './ToolbarInfo/ToolbarInfo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Link } from 'react-router-dom';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const toolbar = props => (
    <header className={classes.NavBar}>
        <div className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.Logo}>
                <Logo logoType="appLogo"/>
            </div>
            <ToolbarInfo content={props.content}/>
            <Link to={`/sign-in`}>
                Είσοδος
            </Link>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems navType="main"/>
        </nav>
    </header>
);

export default toolbar;