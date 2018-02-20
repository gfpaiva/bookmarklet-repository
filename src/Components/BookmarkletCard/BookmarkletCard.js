import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';

const BookmarkletCard = ({ bookmarklet }) => {

	return (
		<Card style={{marginBottom: '30px'}}>
			<Link to={`/bookmarklet/${bookmarklet.id}`}>
				<CardTitle title={bookmarklet.title} />
			</Link>
			<CardText>
				<code ref={code => { this.codeText = code }}>{bookmarklet.code}</code>
			</CardText>
			<CardActions>
			<IconButton tooltip={`Copy Bookmarklet "${bookmarklet.title}"`}>
				<ContentContentCopy />
			</IconButton>
			</CardActions>
		</Card>
	);
};

export default BookmarkletCard;
