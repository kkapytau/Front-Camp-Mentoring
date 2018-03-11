import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentUser } from '../../helper/userApi/userApi';
import validator from 'validator';
import { PASSWORD_PATTERN, EMAIL_ERROR_MSG, PASSWORD_ERROR_MSG, PASSWORD_CONFIRMATION_ERROR_MSG } from '../../redux/constants/Constants';
import './styles.scss';

export class registerForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            confirmPassword: "",
            errorMsg: ""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    handleLogin(event){
        this.setState({ email: event.target.value});
    }

    handlePassword(event){
        this.setState({ password: event.target.value});
    }

    handleConfirmPassword(event){
        this.setState({ confirmPassword: event.target.value});
    }

    isFormValid(){
        const { email, password, confirmPassword } = this.state;
        if(validator.isEmpty(email) || !validator.isEmail(email)){
            this.setState({ errorMsg: EMAIL_ERROR_MSG});
            return false;
        }
        if(validator.isEmpty(password) || !PASSWORD_PATTERN.test(password)){
            this.setState({ errorMsg: PASSWORD_ERROR_MSG});
            return false;
        }
        if(validator.isEmpty(confirmPassword || confirmPassword != password)){
            this.setState({ errorMsg: PASSWORD_CONFIRMATION_ERROR_MSG});
            return false;
        }

        return true;
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.isFormValid()) {
            this.props.authenticate(this.state);
            this.setState({
                email : "",
                password : "",
                confirmPassword: "",
                errorMsg: ""
            });
        }
    }

    render() {
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
                                        <h3 className="mb-0">Enter Credentials</h3>
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
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input type="password"
                                                       className="form-control form-control-lg rounded-0" id="pwd2"
                                                       required="" autoComplete="new-password"
                                                       onChange={ this.handleConfirmPassword }
                                                       value={this.state.confirmPassword} />
                                                <div className="invalid-feedback">Enter your password once more time!</div>
                                            </div>
                                            <button type="submit" className="btn btn-success btn-lg float-right"
                                                    id="btnLogin"
                                                    onClick={ this.handleSubmit }>Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <Link to="/" className="text-center back-to-login">Back to Login Form</Link>
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
        serverErrorMsg: store.userState.serverSignUpErrorMsg
    };
};

function mapDispatchToProps(dispatch) {
    return {
        authenticate: bindActionCreators(currentUser.authenticate.bind(currentUser), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(registerForm);