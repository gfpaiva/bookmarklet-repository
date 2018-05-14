import React from 'react';
import Loader from '../../Components/Loader/Loader';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import CopyButton from '../../Components/CopyButton/CopyButton';

const Home = ({ bookmarklet }) => (
	<div className="container">
		<Loader condition={!bookmarklet} />

		{bookmarklet && (
			<div>
				<h1>{bookmarklet.title}</h1>

				<hr />

				<div>
					<h3>Bookmarklet</h3>
					<code ref={code => { this.codeText = code }}>{bookmarklet.code}</code>
					<CopyButton title={bookmarklet.title} code={bookmarklet.code} />
				</div>

				<div>
					<h3>Source</h3>
					<AceEditor
						maxLines = {Infinity}
						mode = "javascript"
						name = "bookmarklet-source-code-editor"
						readOnly = {true}
						showPrintMargin = {false}
						theme = "monokai"
						value = {bookmarklet.script}
						width ="100%"
					/>
					<CopyButton title={bookmarklet.title} code={bookmarklet.script} />
				</div>

				<div>
					<h3>Usage</h3>
					<img src={bookmarklet.usage} alt={bookmarklet.title} title={bookmarklet.title} className="full-width" />
				</div>
			</div>
		)}
	</div>
);

export default Home;
