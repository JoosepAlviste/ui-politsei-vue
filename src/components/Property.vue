<template>
    <div class="card">

        <div class="card-header property-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Vara #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('property-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
                <div class="row">

                    <form-input
                            :name="'property[' + nr + '][name]'"
                            label="Nimetus"
                            :error="errors['name']"
                            class_name="col"
                            :input_value="property.name"
                            :required="true"
                            @input-was-changed="onNameChanged">
                    </form-input>

                </div>
            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';

    export default {

        components: { CardSection, FormInput },

        props: {
            property: { required: true },
            nr: { required: true },
            errors: { required: true },
            form: { required: true },
        },

        data() {
            return {
                isOpen: true
            };
        },

        methods: {
            onNameChanged(name) {
                this.property.name = name;
                this.form.validate('stolen_properties', 'name', this.nr - 1);
            },
        },
    }
</script>
