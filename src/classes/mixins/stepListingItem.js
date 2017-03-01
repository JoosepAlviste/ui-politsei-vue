module.exports = {

    props: {
        nr: { required: true },
        errors: { required: true },
        form: { required: true },
    },

    data() {
        return {
            isOpen: true
        };
    },

    methods: {
        validate(name) {
            this.form.validate(this.$parent.$parent.$parent.this_step, name, this.nr - 1);
        },

        validateOnTheGo(name) {
            this.form.validateOnTheGo(this.$parent.$parent.$parent.this_step, name, this.nr - 1);
        },

        onInputChange(name, value) {
            this.form[this.$parent.$parent.$parent.this_step][this.nr - 1][name] = value;
            this.validateOnTheGo(name);
        },

        onInputBlurred(name, value) {
            this.form[this.$parent.$parent.$parent.this_step][this.nr - 1][name] = value;
            this.validate(name);
        }
    }
};
