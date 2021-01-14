import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from "../../UI/Button/Button";

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const sideDrawer = props => {
    const attachedClasses = props.open ?
        [classes.SideDrawer, classes.Open] :
        [classes.SideDrawer, classes.Close]

    return (
        <React.Fragment>
            <Backdrop show={props.open} close={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo logoType="appLogo"/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
                <Button btnType="Link"
                        clicked={() => alert('Log in module here' + props.content)}>
                    Είσοδος
                </Button>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;