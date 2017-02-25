<template>
    <step title="Isikuandmed"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

        <card-section>
            <form-input
                    name="first-name"
                    label="Eesnimi"
                    :error="'Test error'"
                    class_name="col"
                    :input_value="first_name"
                    :required="true"
                    @input-was-changed="onFirstNameChanged">
            </form-input>

            <form-input
                    name="last-name"
                    label="Perenimi"
                    :error="''"
                    class_name="col"
                    :input_value="last_name"
                    :required="true"
                    @input-was-changed="onLastNameChanged">
            </form-input>

            <form-input
                    name="date-of-birth"
                    label="Sünniaeg"
                    :error="''"
                    class_name="col-6"
                    :input_value="date_of_birth"
                    help_text="Formaadis pp.kk.aaaa"
                    @input-was-changed="onDateOfBirthChanged">
            </form-input>
        </card-section>

        <card-section>
            <form-input
                    name="address"
                    label="Elukoha aadress (tänav, maja, korter, linn)"
                    :error="''"
                    class_name="col-12"
                    :input_value="address"
                    @input-was-changed="onAddressChanged">
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
                address: '',
                previous_step: '',
                next_step: 'event_info',
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
            },

            onAddressChanged(address) {
                this.address = address;
            }
        }
    }
</script>
