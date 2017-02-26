<template>
    <div class="card">

        <div class="card-header perpetrator-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Süüteo toime pannud isik #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('perpetrator-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
                <div class="row">

                    <form-input
                            :name="'perpetrator[' + nr + '][first_name]'"
                            label="Nimetus"
                            :error="errors['first_name']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="perpetrator.first_name"
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
            perpetrator: { required: true },
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
                this.perpetrator.first_name = name;
                this.form.validate('perpetrators', 'first_name', this.nr - 1);
            }
        },
    }
</script>
