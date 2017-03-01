<template>
    <step title="Toimumise info">

        <card-section>
            <div class="row">
                <form-input
                        name="event-date"
                        label="Toimunu aeg"
                        :error="error('event-date')"
                        class_name="col-sm-8 col-md-6"
                        :input_value="get('event-date')"
                        :required="true"
                        help_text="Formaadis pp.kk.aaaa (täpsem aeg täpsustada toimunu kirjelduses)"
                        @input-was-changed="onValueChanged('event-date', $event)"
                        @input-was-blurred="onInputBlurred('event-date', $event)">
                </form-input>
            </div>
        </card-section>
        <card-section>
            <div class="row">
                <form-select
                        name="event-country"
                        label="Riik"
                        :error="error('event-country')"
                        :input_value="get('event-country')"
                        :values="form.countries"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onValueChanged('event-country', $event)">
                </form-select>
                <form-select v-if="get('event-country') == 'Eesti Vabariik'"
                        name="event-county"
                        label="Maakond"
                        :error="error('event-county')"
                        :input_value="get('event-county')"
                        :values="form.counties"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onValueChanged('event-country', $event)">
                </form-select>
            </div>
            <div class="row">
                <form-select
                        name="prefecture"
                        label="Prefektuur"
                        :error="error('prefecture')"
                        :input_value="get('prefecture')"
                        :values="form.prefectures"
                        class_name="col-sm-8 col-md-4"
                        help_text='Valige "üldine kontakt", kui sündmus toimus mõnes välisriigis'
                        @input-was-changed="onValueChanged('perfecture', $event)">
                </form-select>
            </div>
            <div class="row">
                 <form-input
                        name="event-location"
                        label="Toimumise koht"
                        :error="error('event-location')"
                        class_name="col-sm-12"
                        :input_value="get('event-location')"
                        :required="true"
                        help_text="Näiteks park, kauplus või internet"
                        @input-was-changed="onValueChanged('event-location', $event)"
                        @input-was-blurred="onInputBlurred('event-location', $event)">
                </form-input>
            </div>
        </card-section>
        <card-section>
            <div class="row">
                <form-comment
                        name="event-description"
                        label="Toimunu kirjeldus"
                        :error="error('event-description')"
                        class_name="col"
                        :input_value="get('event-description')"
                        :required="true"
                        @input-was-changed="onValueChanged('event-description', $event)"
                        @input-was-blurred="onInputBlurred('event-description', $event)">
                </form-comment>
            </div>
            <div class="row">
                <form-money
                        name="pecuniary-loss"
                        label="Tekitatud varaline kahju"
                        :error="error('pecuniary-loss')"
                        class_name="col"
                        :input_value="get('pecuniary-loss')"
                        :required="true"
                        @input-was-changed="onValueChanged('pecuniary-loss', $event)"
                        @input-was-blurred="onInputBlurred('pecuniary-loss', $event)">
                </form-money>
            </div>
        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import FormInput from '../components/bootstrap/FormInput.vue';
    import FormSelect from '../components/bootstrap/FormSelect.vue';
    import FormComment from '../components/bootstrap/FormComment.vue';
    import FormMoney from '../components/bootstrap/FormMoney.vue';

    import StepGenericMixin from '../classes/mixins/stepGeneric';
    import StepMixin from '../classes/mixins/step';

    export default {
        
        mixins: [ StepGenericMixin, StepMixin ],
        
        components: { Step, CardSection, FormInput, FormSelect, FormComment, FormMoney },

        props: {
            form: { required: true },
        },

        data() {
            return {
                previous_step: 'person_data',
                next_step: 'stolen_properties',
                this_step: 'event_info',
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
