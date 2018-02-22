import React from 'react';
import BookmarkletCard from '../../Components/BookmarkletCard/BookmarkletCard';
import Loader from '../../Components/Loader/Loader';

const Home = ({ bookmarklets }) => (
	<div className="container">
		<Loader condition={!bookmarklets || bookmarklets.length <= 0} />

		{bookmarklets && bookmarklets.length > 0 && bookmarklets.map(bookmarklet => (
			<BookmarkletCard key={bookmarklet.id} {...{bookmarklet}} />
		))}
	</div>
);

export default Home;
