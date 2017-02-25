class Errors {

    constructor() {
        this.initialize();
    }

    initialize() {
        this.personData = { };
        this.eventInfo = { };
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
        this.initialize();
    }
}

export default Errors;
