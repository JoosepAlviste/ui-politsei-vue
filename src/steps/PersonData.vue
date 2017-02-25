<template>
    <step title="Isikuandmed"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

        <card-section>

            <div class="row">

                <form-input
                        name="first-name"
                        label="Eesnimi"
                        :error="error('first-name')"
                        class_name="col"
                        :input_value="form.get('person_data', 'first-name')"
                        :required="true"
                        @input-was-changed="onFirstNameChanged">
                </form-input>

                <form-input
                        name="last-name"
                        label="Perenimi"
                        :error="error('last-name')"
                        class_name="col"
                        :input_value="form.person_data['last-name']"
                        :required="true"
                        @input-was-changed="onLastNameChanged">
                </form-input>

            </div>

            <div class="row">
                <form-input
                        name="date-of-birth"
                        label="Sünniaeg"
                        :error="error('date-of-birth')"
                        class_name="col-6"
                        :input_value="form.person_data['date-of-birth']"
                        help_text="Formaadis pp.kk.aaaa"
                        @input-was-changed="onDateOfBirthChanged">
                </form-input>
            </div>

            <div class="row">
                <form-select
                        name="citizenship"
                        label="Kodakondsus"
                        :error="error('citizenship')"
                        :input_value="form.person_data['citizenship']"
                        :required="true"
                        :values="countries"
                        class_name="col col-auto"
                        @input-was-changed="onCitizenshipChanged">
                </form-select>
            </div>

        </card-section>

        <card-section>
            <div class="row">
                <form-input
                        name="address"
                        label="Elukoha aadress (tänav, maja, korter, linn)"
                        :error="error('address')"
                        class_name="col-12"
                        :input_value="form.person_data['address']"
                        @input-was-changed="onAddressChanged">
                </form-input>
            </div>

            <div class="row">
                <form-input
                        name="zip-code"
                        label="Postiindeks"
                        :error="error('zip-code')"
                        class_name="col-3"
                        :input_value="form.person_data['zip-code']"
                        @input-was-changed="onZipCodeChanged">
                </form-input>
            </div>

        </card-section>

        <card-section>
            <div class="row">
                <checkbox
                        name="victim-is-legal-person"
                        label="Kannatanu on juriidiline isik"
                        class_name="custom-control-input"
                        :input_value="form.get('person_data', 'is-legal-person')"
                        @input-was-changed="onLegalPersonChanged">
                </checkbox>
            </div>

            <div class="row" v-if="form.get('person_data', 'is-legal-person')">
                <form-input
                        name="victim-registry-code"
                        label="Kannatanu registri kood"
                        :error="error('victim-registry-code')"
                        class_name="col-4"
                        :input_value="form.get('person_data', 'victim-registry-code')"
                        @input-was-changed="onVictimRegistryCodeChanged">
                </form-input>
            </div>
        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import FormInput from '../components/bootstrap/FormInput.vue';
    import FormSelect from '../components/bootstrap/FormSelect.vue';
    import Checkbox from '../components/bootstrap/Checkbox.vue';

    import StepMixin from '../classes/mixins/step';

    export default {

        mixins: [ StepMixin ],

        components: { Step, CardSection, FormInput, FormSelect, Checkbox },

        props: {
            form: { required: true },
        },

        data() {
            return {
                previous_step: '',
                next_step: 'event_info',
                this_step: 'person_data',

                countries: [
                    { value: 'est', text: 'Estonia' },
                    { value: 'rus', text: 'Russia' },
                    { value: 'other', text: 'Other' },
                ],
            };
        },

        methods: {

            onFirstNameChanged(firstName) {
                this.set('first-name', firstName);
            },

            onLastNameChanged(lastName) {
                this.set('last-name', lastName);
            },

            onDateOfBirthChanged(dateOfBirth) {
                this.set('date-of-birth', dateOfBirth);
            },

            onAddressChanged(address) {
                this.set('address', address);
            },

            onCitizenshipChanged(citizenship) {
                this.set('citizenship', citizenship);
            },

            onZipCodeChanged(zipCode) {
                this.set('zip-code', zipCode);
            },

            onLegalPersonChanged(isLegalPerson) {
                this.set('is-legal-person', isLegalPerson);
            },

            onVictimRegistryCodeChanged(victimRegistryCode) {
                this.set('victim-registry-code', victimRegistryCode);
            }
        }
    }
</script>
