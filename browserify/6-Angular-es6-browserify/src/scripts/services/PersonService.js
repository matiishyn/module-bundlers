import Person from '../model/Person';

export default class PersonService {
	constructor($q) {
		this._$q = $q.defer();
	}

	getPerson() {
		this._$q.resolve(new Person().name);
		return this._$q;
	}
}