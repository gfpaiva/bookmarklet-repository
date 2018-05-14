import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';

class CopyButton extends Component {
	state = {
		copied: false
	}

	copyHandler = code => {

		document.addEventListener('copy', event => {
			event.preventDefault();

			if (event.clipboardData) {

				event.clipboardData.setData('text/plain', code);
				this.setState(state => ({ copied: true }));
			}
		});

		document.execCommand('copy');

		setTimeout(() => {
			this.setState(state => ({ copied: false }));
		}, 3000);
	};

	render() {

		const { title, code } = this.props;
		const { copied } = this.state;

		return (
			<div>
				<IconButton tooltip={copied ? `"${title}" COPIED` : `Copy "${title}"`} onClick={() => this.copyHandler(code)}>
					<ContentContentCopy />
				</IconButton>
			</div>
		);
	}
};


export default CopyButton;
