import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';

import CopyButton from '../CopyButton/CopyButton';

const BookmarkletCard = ({ bookmarklet }) => (
	<Card style={{marginBottom: '30px'}}>
		<Link to={`/bookmarklet/${bookmarklet.id}`}>
			<CardTitle title={bookmarklet.title} />
		</Link>

		<CardText>
			<code ref={code => { this.codeText = code }}>{bookmarklet.code}</code>
		</CardText>

		<CardActions>
			<CopyButton title={bookmarklet.title} code={bookmarklet.code} />
		</CardActions>
	</Card>
);

export default BookmarkletCard;
