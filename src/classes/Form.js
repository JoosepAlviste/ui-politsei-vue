import Errors from './Errors';

class Form {

    constructor() {
        this.initialize();
        this.errors = new Errors(this);
    }

    initialize() {
        this.initializeFields();
        this.initializeCountries();
        this.initializeCounties();
        this.initializeContactOptions();
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

        // TODO: Better way to validate?
        if (step === 'person_data') {
            if (name === 'first-name') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Eesnimi on kohustuslik!';
                }
            } else if (name === 'last-name') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Perenimi on kohustuslik!';
                }
            } else if (name === 'date-of-birth') {
                if (!this.exists(this[step][name])) {
                    errorMessage = 'Sünniaeg on kohustuslik!';
                }
                // TODO: Check if past etc.
            } else if (name === 'zip-code') {
                if (!this.isNumeric(this[step][name])) {
                    errorMessage = 'Postiindeks peab olema number!';
                }
            }
        }

        this.errors.add(step, name, errorMessage);
    }

    initializeCounties() {
        this.counties = [
            { value: 1, text: 'Lääne-Virumaa' },
            { value: 2, text: 'Harjumaa' },
            { value: 3, text: 'Ida-Virumaa' },
        ];
    }

    initializeCountries() {
        this.countries = [
            { value: 'EST', text: 'Estonia' },
            { value: 'RUS', text: 'Russia' },
            { value: 'other', text: 'Other' },
        ];
    }

    initializeContactOptions() {
        this.contact_options = [
            { value: 'email', text: 'E-posti teel' },
            { value: 'phone', text: 'Telefoni teel' },
        ];
    }

    initializeFields() {
        this.person_data = {
            'first-name': '',
            'last-name': '',
            'date-of-birth': '',
            'citizenship': 'EST',
            'address': '',
            'zip-code': '',
            'is-legal-person': '',
            'victim-registry-code': '',
            'county': '',
            'contact-option': 'email',
        };
        this.event_info = { };
    }

    exists(val) {
        return val !== null && val.length > 0;
    }

    isNumeric(val) {
        return val === null || val.length === 0 || /^\d+$/.test(val);
    }
}

export default Form;
