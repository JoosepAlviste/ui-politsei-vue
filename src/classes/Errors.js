class Errors {

    constructor(form) {
        this.form = form;
        this.initialize();
    }

    initialize() {
        // Need to fully declare these objects so vue can watch for changes successfully

        this.person_data = { };
        this.event_info = { };
        this.stolen_properties = [ ];
        this.perpetrators = [ ];
        this.witnesses = [ ];

        for (let field in this.form.person_data) {
            if (this.form.person_data.hasOwnProperty(field)) {
                this.person_data[field] = '';
            }
        }
        for (let field in this.form.event_info) {
            if (this.form.event_info.hasOwnProperty(field)) {
                this.event_info[field] = '';
            }
        }
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

    has(step) {
        if (['witnesses', 'stolen_properties', 'perpetrators'].includes(step)) {
            for (let index in this[step]) {
                for (let name in this[step][index]) {
                    if (this[name][index][step].length > 0 && this[step][index][name] !== 'dont-show-success') {
                        return true;
                    }
                }
            }
        } else {
            for (let name in this[step]) {
                if (this[step][name].length > 0 && this[step][name] !== 'dont-show-success') {
                    return true;
                }
            }
        }

        return false;
    }
}

export default Errors;
