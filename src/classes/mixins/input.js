module.exports = {

    props: {
        name: { required: true },
        label: { required: true },
        error: { required: false, default: '' },
        class_name: { required: false, default: '' },
        help_text: { required: false, default: '' },
        input_value: { required: false, default: '' },
        required: { required: false, default: '' },
        input_class: { required: false, default: '' },
        disabled: { required: false, default: false },
    },

    data() {
        return {
            value: this.input_value,
            hasTyped: false,
        };
    },

    computed: {
        hasError() {
            return this.error !== null && this.error.length > 0 && this.error !== 'dont-show-success';
        },

        errorClass() {
            return this.hasError ? 'has-danger' : '';
        },

        successClass() {
            return !this.hasError && this.hasTyped && this.error !== 'dont-show-success' ? 'has-success' : '';
        },

        customClass() {
            return this.class_name;
        },

        hasHelp() {
            return this.help_text.length > 0;
        },

        inputClass() {
            return (this.hasError
                        ? 'form-control-danger'
                        : this.hasTyped && this.error !== 'dont-show-success'
                            ? 'form-control-success'
                            : ''
                ) + ' ' + this.input_class;
        }
    },

    watch: {
        input_value() {
            this.value = this.input_value;
        },

        value() {
            this.hasTyped = true;
            this.$emit('input-was-changed', this.value);
        },
    },

    methods: {
        onBlurred() {
            this.$emit('input-was-blurred', this.value);
        }
    }
};
