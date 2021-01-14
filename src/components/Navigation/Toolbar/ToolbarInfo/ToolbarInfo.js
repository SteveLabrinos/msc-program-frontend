import React from 'react';
import classes from './ToolbarInfo.module.css';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */


const toolbarInfo = props => (
    <div className={classes.AppTitle}>
        <h5>ΗΛΕΚΤΡΟΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ</h5>
        <p>ΜΕΤΑΠΤΥΧΙΑΚΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ ΣΠΟΥΔΩΝ <span>{props.content.program}</span></p>
        <p>ΤΜΗΜΑ <span>{props.content.department}</span></p>
        <p>ΠΑΝΕΠΙΣΤΗΜΙΟ <span>{props.content.university}</span></p>
    </div>
);

export default toolbarInfo;