import React, { Component } from 'react';
import { announce } from '../../assets/statics/staticContent';
import Announcements from '../../components/Announcements/Announcements';

import Cockpit from '../../components/Cockpit/Cockpit';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

class FrontBuilder extends Component {

    state = {
        //  static content. To be retrieved from backend
        //  always getting the 3 most recent announcements
        topAnnouncements: announce.slice(0, 3),
    };

    handleContinueAnnouncements = () => {
        this.props.history.push(`/announcements`);
    }

    handleFullAnnouncement = id => {
        this.props.history.push(`/announcements/${id}`);
    }

    render() {

        return (
            <section>
                <Cockpit title="Αρχική Σελίδα"/>
                <Announcements
                    content={ this.state.topAnnouncements }
                    continueFullAnnouncement={ this.handleFullAnnouncement }
                    continueAnnouncements={ this.handleContinueAnnouncements }
                    showBtn/>
            </section>
        );
    }
}

export default FrontBuilder;