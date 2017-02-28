<template>
    <step title="Toimumise info">

        <card-section>
            <div class="row">
                <form-input
                        name="event-date"
                        label="Toimunu aeg"
                        :error="error('event-date')"
                        class_name="col-sm-8 col-md-6"
                        :input_value="form.event_info['event-date']"
                        :required="true"
                        help_text="Formaadis pp.kk.aaaa (täpsem aeg täpsustada toimunu kirjelduses)"
                        @input-was-changed="onEventDateChanged">
                </form-input>
            </div>
        </card-section>
        <card-section>
            <div class="row">
                <form-select
                        name="event-country"
                        label="Riik"
                        :error="error('event-country')"
                        :input_value="form.event_info['event-country']"
                        :values="form.countries"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onEventCountryChanged">
                </form-select>
                <form-select v-if="form.event_info['event-country'] == 'Eesti Vabariik'"
                        name="event-county"
                        label="Maakond"
                        :error="error('event-county')"
                        :input_value="form.event_info['event-county']"
                        :values="form.counties"
                        class_name="col-sm-8 col-md-4"
                        @input-was-changed="onEventCountyChanged">
                </form-select>
            </div>
            <div class="row">
                <form-select
                        name="prefecture"
                        label="Prefektuur"
                        :error="error('prefecture')"
                        :input_value="form.event_info['prefecture']"
                        :values="form.prefectures"
                        class_name="col-sm-8 col-md-4"
                        help_text='Valige "üldine kontakt", kui sündmus toimus mõnes välisriigis'
                        @input-was-changed="onPrefectureChanged">
                </form-select>
            </div>
            <div class="row">
                 <form-input
                        name="event-location"
                        label="Toimumise koht"
                        :error="error('event-location')"
                        class_name="col-sm-12"
                        :input_value="form.event_info['event-location']"
                        :required="true"
                        help_text="Näiteks park, kauplus või internet"
                        @input-was-changed="onEventLocationChanged">
                </form-input>
            </div>
        </card-section>
        <card-section>
            <div class="row">
                <form-comment
                        name="event-description"
                        label="Toimunu kirjeldus"
                        :error="error['event-description']"
                        class_name="col"
                        :input_value="form.event_info['event-description']"
                        :required="true"
                        @input-was-changed="onEventDescriptionChanged">
                </form-comment>
            </div>
            <div class="row">
                <form-money
                        name="pecuniary-loss"
                        label="Tekitatud varaline kahju"
                        :error="error['pecuniary-loss']"
                        class_name="col"
                        :input_value="form.event_info['pecuniary-loss']"
                        :required="true"
                        @input-was-changed="onPecuniaryLossChanged">
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
    
    import StepMixin from '../classes/mixins/step';

    export default {
        
        mixins: [ StepMixin ],
        
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
        
        methods: {
         
            onEventDateChanged (eventDate) {
                this.set('event-date', eventDate);
            },
            onEventCountryChanged (eventCountry) {
                this.set('event-country', eventCountry);
            },
            onEventCountyChanged (eventCounty) {
                this.set('event-county', eventCounty);
            },
            onPrefectureChanged (eventPrefecture) {
                this.set('prefecture', eventPrefecture);   
            },
            onEventLocationChanged (eventLocation) {
                this.set('event-location', eventLocation);   
            },
            onEventDescriptionChanged (eventDescription) {
                this.set('event-description', eventDescription);
            },
            onPecuniaryLossChanged (pecuniaryLoss) {
                this.set('pecuniary-loss', pecuniaryLoss);
            }
        },

        beforeRouteLeave (to, from, next) {
            this.form.validateAll(this.this_step);

            if (this.form.errors.has(this.this_step)) {

                // Wait with scroll because the form errors have not been rendered yet!
                // Must wait for Vue to update the HTML
                setTimeout(() => {
                    window.jump('.form-control-danger', {
                        duration: 200,
                        offset: -60,
                    });
                }, 100);

                return next(false);
            }

            next();
        }
    }
</script>
