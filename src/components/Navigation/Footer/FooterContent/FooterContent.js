import React from 'react';
import { FaGithub } from 'react-icons/all';
import classes from './FooterContent.module.css';
import Button from '../../../UI/Button/Button';
import Logo from "../../../Logo/Logo";

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const footerContent = props => {
    const container = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    // const contactInfo = {
    //     flexDirection: 'column',
    //     fontSize: '.7rem'
    // }

    const buttonGroup = {
        color: '#ccc'
    };

    return (
        <div className={classes.FooterContent}>
            <Logo logoType="eapLogo"/>
            <div style={container} className={classes.Container}>
                Επικοινωνήστε μαζί μας:
                <div className={classes.ContactInfo}>
                    <a
                        href="https://github.com/SteveLabrinos/msc-program-frontend"
                        target="_blank"
                        rel="noreferrer">
                        <FaGithub className={classes.Icon}/>
                    </a>
                    <div>
                        Τηλέφωνο:
                        <a href="tel:210-9988665"> 210-9988665</a>
                    </div>
                    <div>
                        Email:
                        <a href="mailto:webmaster@example.com"> webmaster@example.com</a>
                    </div>
                </div>
            </div>
            <div style={buttonGroup}>
                <Button clicked={props.clickedTerms}
                        btnType="Link">
                    Όροι Χρήσης
                </Button>
                 |
                <Button clicked={props.clickedPrivacy}
                        btnType="Link">
                    Πολιτική Απορρήτου
                </Button>
            </div>
        </div>
    );
}

export default footerContent;