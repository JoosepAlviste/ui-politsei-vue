<template>
    <step title="Isikuandmed">

        <card-section>
            <form-input
                    name="first-name"
                    label="Eesnimi"
                    :error="'Test error'"
                    class_name="col"
                    :input_value="first_name"
                    @input-was-changed="onFirstNameChanged">
            </form-input>

            <form-input
                    name="last-name"
                    label="Perenimi"
                    :error="''"
                    class_name="col"
                    :input_value="last_name"
                    @input-was-changed="onLastNameChanged">
            </form-input>
        </card-section>

        <card-section>

            <form-input
                    name="date-of-birth"
                    label="Sünniaeg"
                    :error="''"
                    class_name="col-6"
                    :input_value="date_of_birth"
                    @input-was-changed="onDateOfBirthChanged">

                <template slot="addon">COW</template>
            </form-input>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import FormInput from '../components/bootstrap/FormInput.vue';

    export default {

        components: { Step, CardSection, FormInput },

        data() {
            return {
                first_name: '',
                last_name: '',
                date_of_birth: null,
            };
        },

        methods: {
            onFirstNameChanged(firstName) {
                this.first_name = firstName;
            },

            onLastNameChanged(lastName) {
                this.last_name = lastName;
            },

            onDateOfBirthChanged(dateOfBirth) {
                this.date_of_birth = dateOfBirth;
            }
        }
    }
</script>
