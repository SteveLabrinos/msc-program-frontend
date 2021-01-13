import React from 'react';
import privacy from '../../../../assets/statics/privacyPolicy';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

const style = {
    listStyleType: 'upper-roman'
}

const privacyPolicy = () => (
    <ol style={style}>
        {privacy.map((ctx, index) => (
            <li key={index}>
                <h4>{ctx.header}</h4>
                <p>{ctx.content}</p>
            </li>

        ))}
    </ol>
);

export default privacyPolicy;