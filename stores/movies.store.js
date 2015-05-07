
import { Map } from 'immutable';
import actions from 'actions/movie.actions';
import Kefir from 'kefir';

class Collection {

	/**
	 * Pool of streams for updates to the collection. Each entry is a function
	 * that takes the current state as input and returns the new state as
	 * output. Actions generally feed into this pool of updates. e.g. A `create`
	 * action would have a handler that adds a new entry to the collection.
	 */
	updates = Kefir.pool();

	/**
	 * Stream where each event is the new collection. Conceptually this is
	 * equivalent to a reduce call, where the initial value is an empty set
	 * and each subsequent value is that set updated to be the current state.
	 * The set is implemented as a map whose keys are the ids of objects.
	 */
	stream = updates;

	constructor() {
		derp = most.merge(
			action.create
		).scan((prev, fn) => fn(prev), Map())
	}

	listenTo(stream) {
		this.updates.plug(stream);
	}
}

function collection(actions, mappings) {
	var ;
	for (const key in mapping) {

		() => {
			const args = arguments;
			return (col) => func.apply(col, arguments)
		}

		actions[key]


		action.foo();
	}
	return
}

export default class MovieStore {
	constructor() {
		this.movies = collection(actions, {
			create(movie) {
				return this.set(movie.id, movie);
			}
		});
	}

	getAll() {
		return this.movies.map((movies) => movies.toList().toJS());
	}
}
