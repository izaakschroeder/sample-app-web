
import { Component } from 'react';
import { map } from 'lodash';

export default class Index extends Component {

	get displayName() {
		return 'index';
	}

	render() {
		return <html>
			<head>
				<title>Great Website</title>
				map(this.props.styles, style => {
					<link rel='stylesheet' href={style}/>
				})
			</head>
			<body>
				<div>
					{this.props.children}
				</div>
				map(this.props.scripts, script => {
					<script src={script} type='text/javascript'/>
				})
			</body>
		</html>;
	}
}
