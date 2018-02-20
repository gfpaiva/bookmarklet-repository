import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = ({ condition, children }) => (
	<div>
		{condition && (
			<div style={{textAlign: 'center', margin: '0 auto', width: '40px'}}>
				<CircularProgress />
				{children}
			</div>
		)}
	</div>
);

export default Loader;
