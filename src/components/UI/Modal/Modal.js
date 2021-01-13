import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const modal = props => {
    const style = {
        transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
        opacity: props.show ? '1': '0',
    }

    return (
        <React.Fragment>
            <Backdrop
                show={props.show}
                close={props.closeModal}/>
            <div
                className={classes.Modal}
                style={style}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default React.memo(modal);