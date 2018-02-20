import React from 'react';
import { codeIdent } from '../../Utils/helpers';
import Loader from '../../Components/Loader/Loader';
import IconButton from 'material-ui/IconButton';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';

const Home = ({ bookmarklet }) => (
	<div className="container">
		<Loader condition={bookmarklet && bookmarklet.length <= 0} />

		{bookmarklet && (
			<div>
				<h1>{bookmarklet.title}</h1>

				<hr />

				<div>
					<h3>Bookmarklet</h3>
					<code ref={code => { this.codeText = code }}>{bookmarklet.code}</code>
					<div>
						<IconButton tooltip={`Copy Bookmarklet "${bookmarklet.title}"`}>
							<ContentContentCopy />
						</IconButton>
					</div>
				</div>

				<div>
					<h3>Source</h3>
					<p className="code" dangerouslySetInnerHTML={{__html: codeIdent(bookmarklet.script)}} ref={source => { this.sourceText = source }}></p>
					<div>
						<IconButton tooltip={`Copy Source "${bookmarklet.title}"`}>
							<ContentContentCopy />
						</IconButton>
					</div>
				</div>

				<div>
					<h3>Usage</h3>
					<p>CALMA</p>
				</div>
			</div>
		)}
	</div>
);

export default Home;
