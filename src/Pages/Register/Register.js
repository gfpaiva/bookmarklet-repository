import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBackup from 'material-ui/svg-icons/action/backup';
import { storage } from '../../Utils/firebase';
import LinearProgress from 'material-ui/LinearProgress';
import Message from '../../Components/Message/Message';
import { withRouter } from 'react-router';

import './Register.css';

class Register extends Component {
	state = {
		file: null,
		error: false,
		errorMessage: '',
		isFetching: false,
		progress: 0
	};

	// componentWillMount() {
	// }

	submitHandler = e => {
		e.preventDefault();

		const { file } = this.state;

		const uploadTask = storage.child(file.name).put(file);

		uploadTask.on('state_changed',
			//In progress
			snapshot => {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				this.setState(() => ({
					progress,
					isFetching: true,
				}));
			},

			//Error
			err => {
				this.setState(() => ({
					error: true,
					errorMessage: err.message,
					isFetching: false
				}))
			},

			//Completed
			() => {
				console.log('💣💣💣', uploadTask.snapshot);
			});
	};

	fileHandler = e => {
		const file = e.target.files[0];

		this.setState(function() {
			if(file.type === 'image/gif') {
				return {
					file,
					error: false,
					errorMessage: ''
				};
			} else {
				return {
					file: null,
					error: true,
					errorMessage: 'File type is invalid!'
				}
			}
		});
	};

	render() {
		const { error, errorMessage, isFetching, file, progress } = this.state;

		return (
			<div className="container">
				<h1>Add a new bookmarklet</h1>

				{ error && (<Message message={errorMessage} type="error" />)}

				<div className="form">
					<form onSubmit={this.submitHandler} encType="multipart/form-data">
						<input type="file" accept="image/gif" id="upload" name="upload" required multiple="false" style={{display: 'none'}} onChange={this.fileHandler} />
						{file && (
							<div>
								<div className="actual-file">
									<p className="actual-file__name"><strong>File Name: </strong>{file.name}</p>
									<img className="actual-file__image" src={window.URL.createObjectURL(file)} alt="Upload" title="Upload" />
								</div>
							</div>
						)}
						<RaisedButton primary={true}>
							<label htmlFor="upload" style={{display: 'block', width: '100%', height: '100%'}}>
								<ActionBackup color='#ffffff' style={{verticalAlign: 'middle'}} />
							</label>
						</RaisedButton>

						<br />

						{isFetching && <LinearProgress mode="determinate" value={progress} />}

						<RaisedButton label="ACTIOOOON" primary={true} type="submit" style={{marginTop: '30px'}} disabled={isFetching} />
					</form>
				</div>
			</div>
		);
	}
};

export default withRouter(Register);
