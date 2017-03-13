<template>
    <div class="form-group" :class="[ errorClass, customClass, successClass ]">
        <label class="form-control-label" :for="name" :class="{ required: required }">
            {{ label }}
        </label>

        <textarea type="text"
                  class="form-control"
                 :name="name"
                 :id="name"
                 v-model="value"
                 @blur="$emit('input-was-blurred', value)" rows="5"></textarea>
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
