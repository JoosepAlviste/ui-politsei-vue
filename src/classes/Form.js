import Errors from './Errors';

class Form {

    constructor() {
        this.person_data = {};
        this.event_info = {};
        this.errors = new Errors();
    }

    set(step, name, value) {
        this[step][name] = value;
        this.validate(step, name);
    }

    get(step, name) {
        if (this[step] !== null && this[step][name] !== null) {
            return this[step][name];
        }

        return '';
    }

    validateAll() {
        // TODO: Loop through all fields and call validate
    }

    validate(step, name) {
        if (typeof step === 'undefined') {
            // Called validate()
            this.validateAll();
        }

        let errorMessage = '';

        if (step === 'person_data') {
            if (name === 'first-name') {
                if (this[step][name].length === 0) {
                    errorMessage = 'Eesnimi on kohustuslik!';
                }
            } else if (name === 'last-name') {
                if (this[step][name].length === 0) {
                    errorMessage = 'Perenimi on kohustuslik!';
                }
            } else if (name === 'date-of-birth') {
                if (this[step][name].length === 0) {
                    errorMessage = 'Sünniaeg on kohustuslik!';
                }
                // TODO: Check if past etc.
            }
        }

        this.errors.add(step, name, errorMessage);
    }
}

export default Form;
