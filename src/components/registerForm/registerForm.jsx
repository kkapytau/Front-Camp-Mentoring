import React from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../../helper/current-user/currentUser';
import './styles.scss';

export default class registerForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            confirmPassword: "",
            serverErrorMsg : ""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event){
        event.preventDefault();
        currentUser.authenticate(this.state).then((response) => {
            const data = response.data;
            (data.message)?
                this.setState({
                    serverErrorMsg: data.message
                })
                : this.props.history.push("/blogs");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <span className="mb-0 error-msg">{ this.state.serverErrorMsg }</span>
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

