
import { first, contains } from 'lodash';
import parser from 'accept-language-parser';

export default function locale(req) {
	const languages = parser.parse(req.get('accept-language'));
	const supported = { };
	return first(languages, (language) => contains(supported, language));
}
