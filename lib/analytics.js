

import { createFluentSender } from 'flunt-logger';

class Analytics {

	constructor() {
		this.fluentd = createFluentSender('my-app', {
			host: 'localhost',
			port: 24224,
			timeout: 3.0
		});
	}

	emit(name, data) {
		this.flutend.emit(name, data);
	}
}

export default new Analytics();
