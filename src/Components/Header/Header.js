import React from 'react';
import AppBar from 'material-ui/AppBar';
import {withRouter} from "react-router-dom";

const Header = ({ history }) => (
	<AppBar
		title="Bookmarklet Repository"
		style={{marginBottom: '30px'}}
		titleStyle={{cursor: 'pointer'}}
		showMenuIconButton={false}
		onTitleClick={() => history.push('/')}
	/>
);

export default withRouter(Header);