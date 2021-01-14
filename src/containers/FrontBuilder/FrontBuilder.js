import React, {Component} from 'react';
import { announcements } from '../../assets/statics/staticContent';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

class FrontBuilder extends Component {

    state = {
        //  static content. To be retrieved from backend
        //  always getting the 3 most recent announcements
        topAnnouncements: announcements.slice(0, 2)
    }

    render() {

        return (
            <div>
                Home page content here
            </div>
        );
    }
}

export default FrontBuilder;