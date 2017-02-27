<template>
    <div class="card">

        <div class="card-header removable-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Tunnistaja #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('witness-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
                <div class="row">

                    <form-input
                            :name="'witness[' + nr + '][first_name]'"
                            label="Eesnimi"
                            :error="errors['first_name']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="witness.first_name"
                            :required="true"
                            @input-was-changed="onFirstNameChanged">
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
            witness: { required: true },
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
            onFirstNameChanged(name) {
                this.witness.first_name = name;
                this.form.validate('witnesses', 'first_name', this.nr - 1);
            }
        },
    }
</script>
