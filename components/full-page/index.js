
import { Component } from 'react';

/**
 * This component creates a `div` that takes up the width and height of the
 * current viewport.
 */
export default class FullPage extends Component {

	get displayName() {
		return 'full-page';
	}

	getInitialState() {
		return {
			width: 0,
			height: 0
		};
	}

	update() {

		var width = Math.max(
			document.documentElement.clientWidth,
			window.innerWidth || 0
		);
		var height = Math.max(
			document.documentElement.clientHeight,
			window.innerHeight || 0
		);

		this.setState({
			width: width,
			height: height
		});
	}

	componentDidMount() {
		this.update();
		window.addEventListener('resize', this.update);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.update);
	}

	render() {
		return (
			<div className='full-page' style={{
				width: this.state.width,
				height: this.state.height
			}}>{this.props.children}</div>
		);
	}
}
