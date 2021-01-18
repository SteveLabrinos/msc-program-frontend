import React, { Component } from 'react';

import { announce } from '../../assets/statics/staticContent';
import Spinner from '../../components/UI/Spinner/Spinner';
import Cockpit from '../../components/Cockpit/Cockpit';

import { Container, Typography } from '@material-ui/core';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */

class FullAnnouncement extends Component {

    state = {
        fullAnnouncement: {}
    }

    componentDidMount() {
        //  static import until REST API is implemented
        const result = announce.filter(an => (
           an.id === this.props.match.params.anId
        ));
        this.setState({fullAnnouncement: result[0]})
    }

    render() {

        const fullAnnounce = (
            <React.Fragment>
                <Cockpit title={this.state.fullAnnouncement.title} />
                <Container>
                    <Typography variant="subtitle1" color="textSecondary" component="h6">
                        {this.state.fullAnnouncement.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="article">
                        {this.state.fullAnnouncement.fullPost}
                    </Typography>
                </Container>
            </React.Fragment>
        );
        return (
            <div>
                { this.state.fullAnnouncement ?
                     fullAnnounce  :
                    <Spinner/>
                }
            </div>
        );
    }
}

export default FullAnnouncement;
