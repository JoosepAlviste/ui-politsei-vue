<template>
    <div class="form-group col-md-5" :class="[ errorClass, customClass, successClass ]">
        <label class="form-control-label" :for="name" :class="{ required: required }">
            {{ label }}
        </label>
        <div class="input-group ">
          <span class="input-group-addon">€</span>
          <input type="number"
                 class="form-control"
                 :class="inputClass"
                 :name="name"
                 :id="name"
                 v-model="value">
        </div>
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
