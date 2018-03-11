import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { currentUser } from '../../helper/userApi/userApi';
//import currentUser from '../../helper/current-user/currentUser';

import validator from 'validator';
import './styles.scss';
import { LOGIN_EMAIL_ERROR_MSG, LOGIN_PASSWORD_ERROR_MSG } from '../../redux/constants/Constants';

export class loginForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            errorMsg : ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogin(event){
        this.setState({ email: event.target.value});
    }

    handlePassword(event){
        this.setState({ password: event.target.value});
    }

    isFormValid(){
        const { email, password } = this.state;
        if(validator.isEmpty(email)){
            this.setState({ errorMsg: LOGIN_EMAIL_ERROR_MSG});
            return false;
        }
        if(validator.isEmpty(password)){
            this.setState({ errorMsg: LOGIN_PASSWORD_ERROR_MSG});
            return false;
        }

        return true;
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.isFormValid()) {
            this.props.logIn(this.state);
            this.setState({errorMsg: ""});
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/blogs" } };
        const { redirectToReferrer } = this.props;

        if (redirectToReferrer) {
            return <Redirect to={from.pathname} />;
        }

        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <span className="mb-0 error-msg">{ this.props.serverErrorMsg }</span>
                                <span className="mb-0 error-msg">{ this.state.errorMsg }</span>
                                <div className="card rounded-0">
                                    <div className="card-header">
                                        <h3 className="mb-0">Login</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="form" role="form" autoComplete="off" id="formLogin"
                                              noValidate="" method="POST">
                                            <div className="form-group">
                                                <label htmlFor="uname1">Username</label>
                                                <input type="text" className="form-control form-control-lg rounded-0"
                                                       name="uname1" id="uname1" required=""
                                                       onChange={ this.handleLogin }
                                                       value={this.state.email} />
                                                <div className="invalid-feedback">Oops, you missed this one.</div>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password"
                                                       className="form-control form-control-lg rounded-0" id="pwd1"
                                                       required="" autoComplete="new-password"
                                                       onChange={ this.handlePassword }
                                                       value={this.state.password} />
                                                <div className="invalid-feedback">Enter your password too!</div>
                                            </div>
                                            <button type="submit" className="btn btn-success btn-lg float-right"
                                                    id="btnLogin"
                                                    onClick={ this.handleSubmit }>Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <Link to="/signup" className="text-center new-account">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        redirectToReferrer: store.userState.redirectToReferrer,
        serverErrorMsg: store.userState.serverLoginErrorMsg
    };
};

function mapDispatchToProps(dispatch) {
    return {
        logIn: bindActionCreators(currentUser.logIn.bind(currentUser), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);