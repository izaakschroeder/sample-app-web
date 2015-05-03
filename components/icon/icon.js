
import { Component } from 'react';


export default (name) => {

	const name = require('icon!name');

	class Icon extends Component {

		render() {
			return <i className={name}></i>
		}
	}
}
