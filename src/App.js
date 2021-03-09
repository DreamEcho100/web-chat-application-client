import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/Chat/Chat';

function App() {
	return (
		<Fragment>
			<Switch>
				<Route exact path='/' component={Chat} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />

				<Route render={() => <h1>404 Page Not Found!</h1>} />
			</Switch>
		</Fragment>
	);
}

export default App;
