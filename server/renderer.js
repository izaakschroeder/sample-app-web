
import React, { renderToString, renderToStaticMarkup } from 'react';
import Promise from 'bluebird';

export default function renderer(options) {

	return function render(state, data) {
		// Render the react app content.
		const markup = renderToString(<options.app {...state} />);

		// Render the page layout. Note that this is rendered without React
		// ids since no React component will be mounted at the root. While it is
		// possible to `React.render(..., document)`, (and indeed it does have
		// a certain appeal), it means essentially the app has to bootstrap
		// itself, ensuring its own scripts stay loaded and the client props
		// must remain identical or else render will straight up just fail. With
		// that in mind it makes more sense to just split the document into a
		// React managed part and a plain part. This also makes it possible to
		// compute "bubble-up" properties; things like the title which may be
		// overrided by child components and then set on the document itself.
		// However, this also requires diligence on the client side for updating
		// anything that's changed cause React isn't going to do it.
		const output = renderToStaticMarkup(<options.layout
			state={state}
			markup={markup}
			{...data}/>
		);

		return Promise.resolve(output);
	};

}
