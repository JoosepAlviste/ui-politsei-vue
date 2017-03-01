module.exports = {
    methods: {
        error(name) {
            return this.form.errors[this.this_step][name];
        },

        validate(name) {
            this.form.validate(this.this_step, name);
        },

        validateOnTheGo(name) {
            this.form.validateOnTheGo(this.this_step, name);
        },

        set(name, value) {
            this.form[this.this_step][name] = value;
        },

        onValueChanged(name, value) {
            this.set(name, value);
            this.validateOnTheGo(name);
        },

        onInputBlurred(name, value) {
            this.set(name, value);
            this.validate(name);
        },

        get(name) {
            return this.form[this.this_step][name];
        }
    },
};
