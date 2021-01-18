import React, { Component } from 'react';

import { workingStuff } from '../../assets/statics/staticContent';

import Spinner from '../../components/UI/Spinner/Spinner';
import Cockpit from '../../components/Cockpit/Cockpit';
import Stuff from '../../components/Stuff/Stuff';
import { Container } from '@material-ui/core';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 17/1/2021.
 */


class Stuffs extends Component {

    state = {
        stuff: null,
        loading: true,
        group: null
    }

    loadData = () => {
        if (this.props.match.params.type) {
            if (!this.state.group ||
                (this.state.group !== this.props.match.params.type)) {
                //  static load until backend is implemented
                this.setState({loading: true});

                const result = workingStuff
                    .filter(stuff => stuff.type === this.props.match.params.type);
                this.setState({
                    stuff: result,
                    loading: false,
                    group: this.props.match.params.type
                });
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    render() {

        const style = {
           border: 0,
           height: '1px',
           backgroundImage: 'linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'
        }

        const stuffList = (
            this.state.loading ?
                <Spinner /> :
                <Container>
                    {this.state.stuff.map((stuff, index) => (
                        <React.Fragment key={stuff.id}>
                            <Stuff
                                   content={stuff} />
                            {index < this.state.stuff.length - 1 ?
                                <hr style={style}/> : null}
                        </React.Fragment>
                    ))}
                </Container>
        );

        const titleGroup = this.state.group ?
            this.state.group === 'professor' ?
                'Διδάσκοντες': 'Γραμματεία' :
            null;

        return (
            <React.Fragment>
                <Cockpit title={`Προσωπικό - ${titleGroup}`}/>
                {stuffList}
            </React.Fragment>
        );
    }
}

export default Stuffs;