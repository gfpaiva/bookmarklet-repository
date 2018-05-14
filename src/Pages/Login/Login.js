import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../../Components/Loader/Loader';
import Message from '../../Components/Message/Message';
import { auth } from '../../Utils/firebase';
import { withRouter } from 'react-router';

import './Login.css';

class Login extends Component {
	state = {
		email: '',
		password: '',
		error: false,
		errorMessage: '',
		isFetching: false
	};

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(user)this.props.history.push('/', { message: `🤓 Logged with: ${user.email}` });
		});
	}

	submitHandler = e => {
		e.preventDefault();

		const { email, password } = this.state;
		const { history } = this.props;

		this.setState({
			error: false,
			errorMessage: '',
			isFetching: true
		});

		auth.signInWithEmailAndPassword(email, password)
			.then(login => {
				history.push('/', { message: `🤓 Logged with: ${email}` });
			})
			.catch(err => {
				console.error('FireBase LOGIN ERROR', err);

				this.setState({
					error: true,
					errorMessage: err.message,
					isFetching: false
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
		const { error, errorMessage, isFetching } = this.state;

		return (
			<div className="container app-login">
				<h1>Sign in to Bookmarklet Repository</h1>

				{ error && (<Message message={errorMessage} type="error" />)}

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
						<Loader condition={isFetching} />
						<RaisedButton label="Sign in" primary={true} type="submit" style={{marginTop: '30px'}} disabled={isFetching} />
					</form>
				</div>
			</div>
		);
	}
};

export default withRouter(Login);
