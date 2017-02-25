<template>
    <div class="form-group" :class="[ errorClass, customClass ]">
        <label class="form-control-label" :for="name">
            {{ label }}
        </label>

        <div v-if="hasAddon"
             class="input-group">

            <input type="text"
                   class="form-control"
                   :class="{ 'form-control-danger': hasError }"
                   :name="name"
                   :id="name"
                   v-model="value">

            <div class="input-group-addon">
                <slot name="addon"></slot>
            </div>
        </div>

        <input v-else
               type="text"
               class="form-control"
               :class="{ 'form-control-danger': hasError }"
               :name="name"
               :id="name"
               v-model="value">

        <div v-if="hasError"
             class="form-control-feedback">
            {{ error }}
        </div>

        <small v-if="hasHelp"
               class="form-text text-muted">
            {{ help_text }}
        </small>
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
            type: { required: false, default: 'text' },
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
