
import React, { Component } from 'react';

export default class About extends Component {

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
				
			</body>
		</html>;
	}
}
