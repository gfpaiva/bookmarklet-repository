import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';
import { withRouter } from 'react-router';

import './Login.css';

class Login extends Component {
	state = {
		email: '',
		password: '',
		error: false,
		errorMessage: ''
	};

	submitHandler = e => {
		e.preventDefault();

		const { email, password } = this.state;
		const { history } = this.props;

		this.setState({
			error: false,
			errorMessage: ''
		});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(login => {
				history.push('/', { message: `🤓 Login on ${email}` });
			})
			.catch(err => {
				console.error('FB LOGIN ERROR', err);

				this.setState({
					error: true,
					errorMessage: err.message
				});
			})
	};

	changeMail = e => {
		this.setState({
			email: e.target.value
		});
	};

	changePass = e => {
		this.setState({
			password: e.target.value
		});
	};

	render() {
		const { error, errorMessage } = this.state;

		return (
			<div className="container app-login">
				<h1>Sign in to Bookmarklet Repository</h1>

				{ error  && (<p className="message message--error">{errorMessage}</p>)}

				<div className="form">
					<form onSubmit={this.submitHandler}>
						<TextField
							hintText="Type your e-mail (john@doe.com)"
							floatingLabelText="E-mail"
							type="email"
							required="required"
							onChange={this.changeMail}
						/>
						<br />
						<TextField
							hintText="*******"
							floatingLabelText="Password"
							type="password"
							required="required"
							onChange={this.changePass}
						/>
						<br />
						<RaisedButton label="Sign in" primary={true} type="submit" style={{marginTop: '30px'}} />
					</form>
				</div>
			</div>
		);
	}
};

export default withRouter(Login);
