import { Component } from 'react';
import { map } from 'lodash';

/**
 * Encoding `object` to a string safe for embedding inside a <script> tag.
 * See: http://stackoverflow.com/questions/7205902/
 * @param {Object} object The object to convert to safe JSON.
 * @returns {String} Resulting JSON.
 */
function json(object) {
	return JSON.stringify(object).replace(/[/\\<>&=']/g, (match) => {
		return '\\u' + match.charCodeAt(0);
	});
}

export default class HtmlDocument extends Component {

	render() {
		const { state, markup, scripts, styles, lang } = this.props;
		const title = 'Hello World';

		return <html lang={lang}>
			<head>

				// Meta headers
				<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
				<meta http-equiv='Content-type' content='text/html; charset=utf-8'/>
				<meta name='keywords' content=''/>
				<meta name='description' content=''/>
				<meta property='fb:admins' content=''/>
				<meta property='og:title' content=''/>
				<meta property='og:type' content='website'/>
				<meta property='og:image' content='/images/fb-image.png'/>

				// Set the title
				<title>{title}</title>

				// Write all the generated stylesheets from webpack.
				{map(styles, (href, k) =>
					<link key={k} rel='stylesheet' type='text/css' href={href} />
				)}
			</head>

			<body>
				// The root element just stores the rendered React code.
				<div id='root' dangerouslySetInnerHTML={{__html: markup}} />

				// This script block is for copying the state from the server
				// to the client. Note that we have to be extra careful in
				// sanitizing this since any `<script>` tag in the state will
				// open us wide up to XSS and other fun goodies.
				<script dangerouslySetInnerHTML={{
					__html: 'window.xxx = ' + json(state)
				}}>

				// Write all the generated scripts from webpack.
				{ map(scripts, (src, k) => <script key={k} src={src} />) }
			</body>
		</html>;
	}
}
