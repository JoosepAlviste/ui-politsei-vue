<template>
    <div class="form-group" :class="[ errorClass, customClass ]">

        <label :for="name">Example select</label>

        <select class="form-control" :id="name" :name="name" v-model="value">
            <option v-for="option in values" :value="option.value">
                {{ option.text }}
            </option>
        </select>

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
            values: { required: true },
        },
    }
</script>
