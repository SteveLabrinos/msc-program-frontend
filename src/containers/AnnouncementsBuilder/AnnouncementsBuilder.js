import React, { Component } from 'react';
import {announce} from '../../assets/statics/staticContent';
import Cockpit from '../../components/Cockpit/Cockpit';
import Announcements from '../../components/Announcements/Announcements';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */

class AnnouncementsBuilder extends Component {

    state = {
        //  static content. To be retrieved from backend
        topAnnouncements: announce
    }

    handleFullAnnouncement = id => {
        this.props.history.push(`${this.props.match.url}/${id}`);
    }

    render() {

        return (
            <section>
                <Cockpit title="Ανακοινώσεις"/>
                <Announcements content={ this.state.topAnnouncements }
                               continueFullAnnouncement={ this.handleFullAnnouncement } />
            </section>
        );
    }
}

export default AnnouncementsBuilder;