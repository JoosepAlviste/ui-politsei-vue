class Errors {

    constructor() {
        this.initialize();
    }

    initialize() {
        // Need to fully declare these objects so vue can watch for changes successfully

        this.person_data = {
            'first-name': '',
            'last-name': '',
            'date-of-birth': '',
            'citizenship': '',
            'address': '',
            'zip-code': '',
            'is-legal-person': '',
            'victim-registry-code': '',
        };
        this.event_info = { };
    }

    get(step, name) {
        if (this[step][name] !== null) {
            return this[step][name];
        }

        return '';
    }

    add(step, name, value) {
        this[step][name] = value;
    }

    empty(step, name) {
        this[step][name] = '';
    }

    flush() {
        this.initialize()
    }
}

export default Errors;
