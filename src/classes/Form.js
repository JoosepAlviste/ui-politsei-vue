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

    validate(step, name, index) {
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
        } else if (step === 'stolen_properties') {
            if (name === 'name') {
                if (!this.exists(this[step][index][name])) {
                    errorMessage = 'Nimetus on kohustuslik!';
                }
            }
            if (name === 'year_of_acquiring'){
                var checkedVal = this[step][index][name];
                if (checkedVal){
                  var currentYear = new Date().getFullYear();
                  if (checkedVal < 1800){
                    errorMessage = 'Soetamise aasta peab olema suurem kui 1800';
                  } else if (checkedVal > currentYear){
                    errorMessage = 'Vara ei saa olla soetatud hiljem kui ' + currentYear;
                  }
                }
            }
        }

        if (typeof index !== 'undefined') {
            this.errors[step][index][name] = errorMessage;
        } else {
            this.errors.add(step, name, errorMessage);
        }
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
            'is-legal-person': false,
            'victim-registry-code': '',
            'county': '',
            'contact-option': 'email',
        };
        this.event_info = { };

        this.stolen_properties = [ ];
        this.perpetrators = [ ];
        this.witnesses = [ ];
    }

    exists(val) {
        return val !== null && val.length > 0;
    }

    isNumeric(val) {
        return val === null || val.length === 0 || /^\d+$/.test(val);
    }

    addStolenProperty() {
        this.stolen_properties.push({
            name: '',
            year_of_acquiring: null,
            value: null,
            in_locked_area: false,
            special_indicators: '',
            property_exists_time: null,
            property_lost_time: null,
        });
        this.errors.stolen_properties.push({
            name: '',
            year_of_acquiring: '',
            value: '',
            in_locked_area: '',
            special_indicators: '',
            property_exists_time: '',
            property_lost_time: '',
        });
    }

    removeStolenProperty(index) {
        this.stolen_properties.splice(index, 1);
        this.errors.stolen_properties.splice(index, 1);
    }

    addPerpetrator() {
        this.perpetrators.push({
            first_name: '',
            last_name: '',
            date_of_birth: null,
            personal_code: null,
            citizenship: null,
            profession: '',
            address: '',
            email: '',
            phone: '',
            special_indicators: '',
        });
        this.errors.perpetrators.push({
            first_name: '',
            last_name: '',
            date_of_birth: '',
            personal_code: '',
            citizenship: '',
            profession: '',
            address: '',
            email: '',
            phone: '',
            special_indicators: '',
        });
    }

    removePerpetrator(index) {
        this.perpetrators.splice(index, 1);
    }
}

export default Form;
