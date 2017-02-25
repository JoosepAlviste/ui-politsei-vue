module.exports = {

    props: {
        name: { required: true },
        label: { required: true },
        error: { required: false, default: '' },
        class_name: { required: false, default: '' },
        help_text: { required: false, default: '' },
        input_value: { required: false, default: '' },
        required: { required: false, default: '' },
    },

    data() {
        return {
            value: null,
            hasTyped: false,
        };
    },

    computed: {
        hasError() {
            return this.error.length > 0;
        },

        errorClass() {
            return this.hasError ? 'has-danger' : '';
        },

        successClass() {
            return !this.hasError && this.hasTyped ? 'has-success' : '';
        },

        customClass() {
            return this.class_name;
        },

        hasHelp() {
            return this.help_text.length > 0;
        },
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
            this.$emit('input-was-changed', this.value);
        }
    }
};
