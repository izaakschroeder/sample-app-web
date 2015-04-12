
import { Route, NotFoundRoute, DefaultRoute, Redirect } from 'react-router';
import App from './app'

export default <Route handler={App} path='/'>
	<DefaultRoute handler={Home} />
	<Route name='about' handler={About} />
	<Route name='users' handler={Users}>
		<Route name='recent-users' path='recent' handler={RecentUsers} />
		<Route name='user' path='/user/:userId' handler={User} />
		<NotFoundRoute handler={UserRouteNotFound}/>
	</Route>
	<NotFoundRoute handler={NotFound}/>
	<Redirect from='company' to='about' />
</Route>;
