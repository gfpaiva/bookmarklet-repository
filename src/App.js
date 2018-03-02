import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import db from './Utils/firebase';
import { firebaseToArray } from './Utils/helpers';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Single from './Pages/Single/Single';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

class App extends Component {
	state = {
		bookmarklets: []
	};

	componentDidMount() {
		db.once('value')
		.then(snapshot => {
			this.setState({
				bookmarklets: firebaseToArray(snapshot.val())
			});
		});
	};

	render() {
		const { bookmarklets } = this.state;

		return (
			<div className="app">
				<Header />
				<Switch>
					<Route exact path="/" render={() => (
						<Home
							{...{bookmarklets}}
						/>
					)} />

					<Route exact path="/bookmarklet/:id" render={({ match }) => {
						const bookmarklet = this.state.bookmarklets.find(bookmarklets => bookmarklets.id === match.params.id);

						console.log(bookmarklet);

						return (
							<Single
								{...{bookmarklet}}
							/>
						);
					}} />

					<Route exact path="/login" component={Login}/>

					<Route exact path="/add" component={Register}/>

					<Route render={() => (<h1 style={{textAlign: 'center'}}>Page not foud <span role="img" aria-label="Neutral Face">😐</span></h1>)} />
				</Switch>
			</div>
		);
	};

};

export default App;
