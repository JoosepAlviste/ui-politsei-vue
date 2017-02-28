module.exports = {
    methods: {
        error(name) {
            return this.form.errors[this.this_step][name];
        },

        validate(name) {
            this.form.validate(this.this_step, name);
        },

        set(name, value) {
            this.form.set(this.this_step, name, value);
        },
    },
};
