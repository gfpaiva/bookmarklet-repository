import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FileAttachment from 'material-ui/svg-icons/file/attachment';
import ContentSave from 'material-ui/svg-icons/content/save';
import db, { storage } from '../../Utils/firebase';
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
		progress: 0,
		title: '',
		script: '',
		code: ''
	};

	// componentWillMount() {
	// }

	submitHandler = e => {
		e.preventDefault();

		const { file, title, script, code } = this.state;

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
					file: null,
					error: true,
					errorMessage: err.message,
					isFetching: false,
					progress: 0
				}));

				this.fileInput.value = null;
			},

			//Completed
			() => {
				const newBookmarklet = db.push();

				newBookmarklet.set({
					title,
					script,
					code,
					usage: uploadTask.snapshot.downloadURL
				})
				.then(() => {
					this.setState(() => ({
						file: null,
						isFetching: false,
						progress: 0,
						title: '',
						script: '',
						code: ''
					}));

					this.fileInput.value = null;

					this.props.history.push('/');
				})
				.catch(err => {
					this.setState(() => ({
						file: null,
						error: true,
						errorMessage: err.message,
						isFetching: false,
						progress: 0
					}));
				});
			});
	};

	fileHandler = e => {
		const file = e.target.files[0];

		this.setState(function() {
			if(file && file.type === 'image/gif') {
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

	changeText = e => {
		const target = e.target;

		this.setState(() => ({
			[target.name]: target.value
		}))
	};

	render() {
		const { error, errorMessage, isFetching, file, progress } = this.state;

		return (
			<div className="container">
				<h1>Add a new bookmarklet</h1>

				{ error && (<Message message={errorMessage} type="error" />)}

				<div className="form">
					<form onSubmit={this.submitHandler} encType="multipart/form-data">
						<TextField
							floatingLabelText="Title"
							type="text"
							required="required"
							onChange={this.changeText}
							name="title"
							fullWidth={true}
							value={this.state.title}
						/>

						<br />

						<TextField
							floatingLabelText="Source Code"
							multiLine={true}
							rows={10}
							required="required"
							onChange={this.changeText}
							name="script"
							fullWidth={true}
							value={this.state.script}
						/>

						<br />

						<TextField
							floatingLabelText="Bookmarklet Code"
							type="text"
							required="required"
							onChange={this.changeText}
							name="code"
							fullWidth={true}
							value={this.state.code}
						/>

						<br />

						<input
							type="file"
							accept="image/gif"
							id="upload"
							name="upload"
							required
							multiple="false"
							style={{display: 'none'}}
							onChange={this.fileHandler}
							ref={input => this.fileInput = input}
						/>

						<div>
							<div className="actual-file">
							{file ? (
								<div>
									<p className="actual-file__name"><strong>File Name: </strong>{file.name}</p>
									<img className="actual-file__image" src={window.URL.createObjectURL(file)} alt="Upload" title="Upload" />
								</div>
							) : <p>Select the usage gif</p>}
							</div>
						</div>

						<RaisedButton primary={true}>
							<label htmlFor="upload" className="cta__upload">
								<span>
									<FileAttachment color='#ffffff' /> Pick a file
								</span>
							</label>
						</RaisedButton>

						<br />

						{isFetching && <LinearProgress className="rmt" style={{marginTop: '30px'}} mode="determinate" value={progress} />}

						<RaisedButton className="rmt" label="Save Bookmarklet" primary={true} type="submit" disabled={isFetching} icon={<ContentSave color="#fff" />} />
					</form>
				</div>
			</div>
		);
	}
};

export default withRouter(Register);
