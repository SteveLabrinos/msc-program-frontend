import React, {Component, Fragment} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Navigation/Footer/Footer';
import Modal from '../../components/UI/Modal/Modal';

import classes from './Layout.module.css';
import PrivacyPolicy from '../../components/Navigation/Footer/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from '../../components/Navigation/Footer/TermsOfUse/TermsOfUse';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

class Layout extends Component {

    state = {
        showSideDrawer: false,
        showPrivacy: false,
        showTerms: false,

        //  Static content. This will be retrieved from the backend

        appTitle: {
            program: 'Πληροφοριακά Συστήματα',
            department: 'Πληροφορικής',
            university: 'Ελληνικό Ανοιχτό Πανεπιστήμιο'
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    //  clean way to use this.state in setState
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    privacyHandler = () => {
        this.setState({showPrivacy: true});
    }

    termsHandler = () => {
        this.setState({showTerms: true});
    }

    privacyCancelHandler = () => {
        this.setState({showPrivacy: false});
    }

    termsCancelHandler = () => {
        this.setState({showTerms: false});
    }


    render() {

        return (
            <Fragment>
                <div style={{minHeight: 'calc(69vh - 11px)'}}>
                    <Modal show={this.state.showPrivacy}
                           closeModal={this.privacyCancelHandler}>
                        <PrivacyPolicy/>
                    </Modal>
                    <Modal show={this.state.showTerms}
                           closeModal={this.termsCancelHandler}>
                        <TermsOfUse/>
                    </Modal>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                             content={this.state.appTitle}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </div>
                <Footer showPrivacy={this.privacyHandler}
                        showTerms={this.termsHandler}/>
            </Fragment>
        );
    }
}

export default Layout;