import _ from 'lodash';
import React, { Component } from 'react';
import escape from 'script-escape';

export default class Layout extends Component {

	render() {

		const {
			markup,
			scripts,
			styles,
			title,
			language,
			keywords,
			description,
			state
		} = this.props;

		// Create a serialized version of the state so that the client can
		// restore it.
		const serialized = escape(JSON.stringify(state));

		return <html lang={language}>
			<head>
				<title>{title}</title>

				// See: https://gist.github.com/kevinSuttle/1997924 for a
				// very mostly complete list of metatags.
				<meta name="keywords" content={keywords}/>
				<meta name="description" content={description}/>

				{_.map(styles, (href, i) => {
					return <link rel='stylesheet' href={href} key={i}/>;
				})}
			</head>
			<body>
				<div id='content' dangerouslySetInnerHTML={{
					__html: markup || ''
				}}/>
				<script type='text/javascript' dangerouslySetInnerHTML={{
					__html: 'window.__state__ = ' + serialized + ';'
				}}/>
				{_.map(scripts, (src, i) => {
					return <script type='text/javascript' src={src} key={i}/>;
				})}
			</body>
		</html>;
	}
}
