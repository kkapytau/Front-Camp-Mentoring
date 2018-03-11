import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { currentUser } from '../../helper/userApi/userApi';

class CurrentUser extends React.PureComponent {
    constructor(props) {
        super(props);
        props.isExist();
    }

    render() {
        if (!this.props.isServerLoggedIn) {
            return <Redirect to="/" />;
        }
        if(currentUser.isLoggedIn()) {
            return(
                <div className="signout">
                    <button onClick={this.props.logOff} className="find-blog btn btn-primary">Log Out</button>
                </div>);
        }

        return null;
    }
}

const mapStateToProps = function (store) {
    return {
        isServerLoggedIn: store.userState.isServerLoggedIn
    };
};

function mapDispatchToProps(dispatch) {
    return {
        logOff: bindActionCreators(currentUser.signout.bind(currentUser), dispatch),
        isExist: bindActionCreators(currentUser.isExist.bind(currentUser), dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentUser));
