
import Kefir from 'kefir';
import Promise from 'bluebird';

function action(createPromise) {
	const pool = Kefir.pool();

	function send(value) {
		// Create the promise that resolves the action.
		const promise = createPromise.apply(null, arguments);

		// Create an event stream from the promise.
		const stream = Kefir.stream(emitter => {

			// Emit the original value as an optimistic result.
			emitter.emit(value);

			// Bind promise results through the emitter.
			promise
				.then(emitter.emit)
				.catch(emitter.error)
				.finally(emitter.end);
		});

		// Patch the stream events through to the pool
		pool.plug(stream);

		// Return the promise.
		return promise;
	}

	// Export the pool for watching.
	send.observable = pool;

	return send;
}


export default {
	create: action(() => Promise.resolve({ id: 5 })),
	save: action()
};
