import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolbarInfo from './ToolbarInfo/ToolbarInfo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

export default function Toolbar(props) {
    const history = useHistory();

    const handleSignIn = () => {
        console.log(props.token);
        history.push(`/sign-${props.token ? 'out' : 'in'}`);
    };

    return (
        <header className={classes.NavBar}>
            <div className={classes.Toolbar}>
                <DrawerToggle clicked={props.drawerToggleClicked}/>
                <div className={classes.Logo}>
                    <Logo logoType="appLogo"/>
                </div>
                <ToolbarInfo content={props.content}/>
                <Button size="large"
                        onClick={handleSignIn}
                        color="inherit" disableRipple>
                    {props.token ? 'εξοδος' : 'εισοδος'}
                </Button>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems navType="main"/>
            </nav>
        </header>
    )
}