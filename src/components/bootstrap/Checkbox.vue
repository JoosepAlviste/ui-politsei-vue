<template>
    <div class="form-group col-6" :class="[ errorClass ]">
        <label class="custom-control custom-checkbox" :for="name">

            <input
                   type="checkbox"
                   class="custom-control-input"
                   :class="{ 'form-control-danger': hasError }"
                   :name="name"
                   :id="name"
                   v-model="value">

            <span class="custom-control-indicator"></span>

            <span class="custom-control-description">{{ label }}</span>

            <div v-if="hasError"
                 class="form-control-feedback">
                {{ error }}
            </div>

            <small v-if="hasHelp"
                   class="form-text text-muted">
                {{ help_text }}
            </small>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            name: { required: true },
            label: { required: true },
            error: { required: false, default: '' },
            class_name: { required: false, default: '' },
            help_text: { required: false, default: '' },
            type: { required: false, default: 'checkbox' },
            input_value: { required: false, default: '' },
        },

        data() {
            return {
                value: '',
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
    }
</script>
