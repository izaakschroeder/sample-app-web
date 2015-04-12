import { Component } from 'react';
import { CSSTransitionGroup } from 'react-addons';
import './styles.scss';

/**
 * Create a rotating display of images, text and the like.
 *
 */
export default class Carousel extends Component {

	get displayName() {
		return 'carousel';
	}

	render() {
		return <div className='carousel'>
			<CSSTransitionGroup component='div' transitionName='example'>
				<Router.RouteHandler key={name}/>
			</CSSTransitionGroup>
		</div>;
	}
}
