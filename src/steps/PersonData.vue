<template>
    <step title="Isikuandmed">

        <card-section>

            <div class="row">

                <form-input
                        name="first-name"
                        label="Eesnimi"
                        :error="error('first-name')"
                        class_name="col-sm-12 col-md-6"
                        :input_value="form.get('person_data', 'first-name')"
                        :required="true"
                        @input-was-changed="onFirstNameChanged">
                </form-input>

                <form-input
                        name="last-name"
                        label="Perenimi"
                        :error="error('last-name')"
                        class_name="col-sm-12 col-md-6"
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
                        class_name="col-sm-8 col-md-6"
                        :input_value="form.person_data['date-of-birth']"
                        :required="true"
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
                        :values="form.countries"
                        class_name="col-sm-8 col-md-4"
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
                        class_name="col-sm-12"
                        :input_value="form.person_data['address']"
                        @input-was-changed="onAddressChanged">
                </form-input>
            </div>

            <div class="row">
                <form-select
                        name="county"
                        label="Maakond"
                        :error="error('county')"
                        :input_value="form.person_data['county']"
                        :required="true"
                        :values="form.counties"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onCountyChanged">
                </form-select>
            </div>

            <div class="row">
                <form-input
                        name="zip-code"
                        label="Postiindeks"
                        :error="error('zip-code')"
                        class_name="col-sm-6 col-md-4"
                        input_class="col"
                        :input_value="form.person_data['zip-code']"
                        @input-was-changed="onZipCodeChanged">
                </form-input>
            </div>

        </card-section>

        <card-section>
            <div class="row">
                <form-select
                        name="contact-option"
                        label="Sobiv viis kontakteerumiseks"
                        :error="error('contact-option')"
                        :input_value="form.person_data['contact-option']"
                        :values="form.contact_options"
                        class_name="col-sm-8 col-md-6"
                        @input-was-changed="onContactOptionChanged">
                </form-select>
            </div>
            <div class="row">
                <form-input v-if="form.person_data['contact-option'] == 'email'"
                        name="email"
                        label="E-mail"
                        :error="error('email')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="form.person_data['email']"
                        @input-was-changed="onEmailChanged">
                </form-input>
                <form-input v-if="form.person_data['contact-option'] == 'phone'"
                        name="phone"
                        label="Telefon"
                        :error="error('phone')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="form.person_data['phone']"
                        @input-was-changed="onPhoneChanged">
                </form-input>
                <form-input v-if="form.person_data['contact-option'] == 'phone'"
                        name="contact-time"
                        label="Sobiv aeg kontakteerumiseks"
                        :error="error('contact-time')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="form.person_data['contact-time']"
                        @input-was-changed="onContactTimeChanged">
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
                        class_name="col-sm-12 col-md-6"
                        input_class="col-sm-12 col-md-6"
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
                this_step: 'person_data',
                previous_step: '/',
                next_step: 'event_info',
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
            },

            onCountyChanged(county) {
                this.set('county', county);
            },

            onContactOptionChanged(contactOption) {
                this.set('contact-option', contactOption);
            },

            onEmailChanged(email) {
                this.set('email', email);
            },

            onPhoneChanged(phone) {
                this.set('phone', phone);
            },

            onContactTimeChanged(contactTime) {
                this.set('contact-time', contactTime);
            },
        }
    }
</script>
