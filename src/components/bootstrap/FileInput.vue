<template>
    <div class="form-group" :class="[ errorClass, customClass, successClass ]">
        <label class="form-control-label" :for="name" :class="{ required: required }">
            {{ label }}
        </label>

        <input type="file"
               class="form-control"
               :class="inputClass"
               :name="name"
               :id="name"
               :required="true">

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
    import Input from '../../classes/mixins/input';

    export default {
        mixins: [ Input ],

        props: {
            type: { required: false, default: 'text' },
        },
    }
</script>
