<template>
    <div class="form-group col-md-12" :class="[ errorClass ]">
        <label class="custom-control custom-checkbox" :class="{ required: required }" :for="name">

            <input type="checkbox"
                   class="custom-control-input"
                   :class="{ 'form-control-danger': hasError }"
                   :name="name"
                   :id="name"
                   v-model="value">

            <span class="custom-control-indicator"></span>

            <span class="custom-control-description no-danger-show">{{ label }}</span>
        </label>

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
    }
</script>
