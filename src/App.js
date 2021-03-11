import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import {
	faSpinner,
	faEllipsisV,
	faUserPlus,
	faSignOutAlt,
	faTrash,
	faCaretDown,
	faUpload,
	faTimes,
	faBell,
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/Chat/Chat';
import ProtectesRoutes from './components/ProtectesRoutes/ProtectesRoutes';

library.add(
	faSmile,
	faImage,
	faSpinner,
	faEllipsisV,
	faUserPlus,
	faSignOutAlt,
	faTrash,
	faCaretDown,
	faUpload,
	faTimes,
	faBell
);

function App() {
	return (
		<Fragment>
			<Switch>
				<ProtectesRoutes exact path='/' component={Chat} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />

				<Route render={() => <h1>404 Page Not Found!</h1>} />
			</Switch>
		</Fragment>
	);
}

export default App;
