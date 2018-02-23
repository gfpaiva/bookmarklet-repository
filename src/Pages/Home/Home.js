import React from 'react';
import BookmarkletCard from '../../Components/BookmarkletCard/BookmarkletCard';
import { withRouter } from 'react-router';
import Loader from '../../Components/Loader/Loader';
import Message from '../../Components/Message/Message';

const Home = ({ bookmarklets, location }) => (
	<div className="container">
		<Loader condition={!bookmarklets || bookmarklets.length <= 0} />

		{location.state && location.state.message && (<Message message={location.state.message} type="warning" />)}

		{bookmarklets && bookmarklets.length > 0 && bookmarklets.map(bookmarklet => (
			<BookmarkletCard key={bookmarklet.id} {...{bookmarklet}} />
		))}
	</div>
);

export default withRouter(Home);
