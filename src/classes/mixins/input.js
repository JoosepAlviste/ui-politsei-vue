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
        };
    },

    computed: {
        hasError() {
            return this.error.length > 0;
        },

        errorClass() {
            return this.hasError ? 'has-danger' : '';
        },

        customClass() {
            return this.class_name;
        },

        hasHelp() {
            return this.help_text.length > 0;
        },

        hasAddon() {
            return typeof this.$slots['addon'] !== 'undefined';
        }
    },

    watch: {
        input_value() {
            this.value = this.input_value;
        },

        value() {
            this.$emit('input-was-changed', this.value);
        }
    }
};
