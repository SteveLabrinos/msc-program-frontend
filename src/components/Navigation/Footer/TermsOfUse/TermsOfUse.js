import React from 'react';
import { terms } from '../../../../assets/statics/staticContent';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 14/1/2021.
 */

const termsOfUse = () => (
    <React.Fragment>
        <h3>{terms.title}</h3>
        <article>{terms.description}</article>
    </React.Fragment>
);

export default termsOfUse;