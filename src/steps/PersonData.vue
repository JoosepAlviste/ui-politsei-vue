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
                        class_name="col-sm-12 col-md-6"
                        :input_value="get('first-name')"
                        :required="true"
                        @input-was-changed="onValueChanged('first-name', $event)"
                        @input-was-blurred="onInputBlurred('first-name', $event)">
                </form-input>

                <form-input
                        name="last-name"
                        label="Perenimi"
                        :error="error('last-name')"
                        class_name="col-sm-12 col-md-6"
                        :input_value="get('last-name')"
                        :required="true"
                        @input-was-changed="onValueChanged('last-name', $event)"
                        @input-was-blurred="onInputBlurred('last-name', $event)">
                </form-input>

            </div>

            <div class="row">
                <form-input
                        name="date-of-birth"
                        label="Sünniaeg"
                        :error="error('date-of-birth')"
                        class_name="col-sm-8 col-md-6"
                        :input_value="get('date-of-birth')"
                        :required="true"
                        help_text="Formaadis pp.kk.aaaa"
                        @input-was-changed="onValueChanged('date-of-birth', $event)"
                        @input-was-blurred="onInputBlurred('date-of-birth', $event)">
                </form-input>
            </div>

            <div class="row">
                <form-select
                        name="citizenship"
                        label="Kodakondsus"
                        :error="error('citizenship')"
                        :input_value="get('citizenship')"
                        :required="true"
                        :values="form.countries"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onValueChanged('citizenship', $event)">
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
                        :input_value="get('address')"
                        @input-was-changed="onValueChanged('address', $event)"
                        @input-was-blurred="onInputBlurred('address', $event)">
                </form-input>
            </div>

            <div class="row">
                <form-select
                        name="county"
                        label="Maakond"
                        :error="error('county')"
                        :input_value="get('county')"
                        :required="true"
                        :values="form.counties"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onValueChanged('county', $event)">
                </form-select>
            </div>

            <div class="row">
                <form-number
                        name="zip-code"
                        label="Postiindeks"
                        :error="error('zip-code')"
                        class_name="col-sm-6 col-md-4"
                        input_class="col"
                        :input_value="get('zip-code')"
                        @input-was-changed="onValueChanged('zip-code', $event)"
                        @input-was-blurred="onInputBlurred('zip-code', $event)">
                </form-number>
            </div>

        </card-section>

        <card-section>
            <div class="row">
                <form-select
                        name="contact-option"
                        label="Sobiv viis kontakteerumiseks"
                        :error="error('contact-option')"
                        :input_value="get('contact-option')"
                        :values="form.contact_options"
                        class_name="col-sm-8 col-md-6"
                        @input-was-changed="onValueChanged('contact-option', $event)">
                </form-select>
            </div>
            <div class="row">
                <form-input v-if="get('contact-option') == 'email'"
                        name="email"
                        label="E-mail"
                        :error="error('email')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="get('email')"
                        @input-was-changed="onValueChanged('email', $event)"
                        @input-was-blurred="onInputBlurred('email', $event)">
                </form-input>
                <form-input v-if="get('contact-option') == 'phone'"
                        name="phone"
                        label="Telefon"
                        :error="error('phone')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="get('phone')"
                        @input-was-changed="onValueChanged('phone', $event)"
                        @input-was-blurred="onInputBlurred('phone', $event)">
                </form-input>
                <form-input v-if="get('contact-option') == 'phone'"
                        name="contact-time"
                        label="Sobiv aeg kontakteerumiseks"
                        :error="error('contact-time')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col"
                        :input_value="get('contact-time')"
                        @input-was-changed="onValueChanged('contact-time', $event)"
                        @input-was-blurred="onInputBlurred('contact-time', $event)">
                </form-input>
            </div>
        </card-section>

        <card-section>
            <div class="row">
                <checkbox
                        name="victim-is-legal-person"
                        label="Kannatanu on juriidiline isik"
                        class_name="custom-control-input"
                        :input_value="get('is-legal-person', $event)"
                        @input-was-changed="onValueChanged('is-legal-person', $event)">
                </checkbox>
            </div>

            <div class="row" v-if="get('is-legal-person')">
                <form-input
                        name="victim-registry-code"
                        label="Kannatanu registri kood"
                        :error="error('victim-registry-code')"
                        class_name="col-sm-12 col-md-6"
                        input_class="col-sm-12 col-md-6"
                        :input_value="get('victim-registry-code')"
                        @input-was-changed="onValueChanged('victim-registry-code', $event)"
                        @input-was-blurred="onInputBlurred('victim-registry-code', $event)">
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
    import FormNumber from '../components/bootstrap/FormNumber.vue';

    import StepGenericMixin from '../classes/mixins/stepGeneric';
    import StepMixin from '../classes/mixins/step';

    export default {

        mixins: [ StepGenericMixin, StepMixin ],

        components: { Step, CardSection, FormInput, FormSelect, Checkbox, FormNumber },

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

        beforeRouteLeave (to, from, next) {

            if (this.checkErrors(to, from)) {
                return next(false);
            }

            return next();
        }

    }
</script>
