<template>
    <step title="Süüteo toime pannud isiku(te) andmed">

        <card-section>

            <perpetrator v-for="(perpetrator, index) in form.perpetrators"
                      :perpetrator="perpetrator"
                      :nr="index + 1"
                      :errors="error(index)"
                      :form="form"
                      @perpetrator-was-removed="removePerpetrator(index)">
            </perpetrator>

            <div class="row addBtnContainer">
                <a href="" class="btn btn-primary" @click.prevent="addPerpetrator">
                    Lisa isik
                </a>
            </div>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import Perpetrator from '../components/Perpetrator.vue';
    import StepMixin from '../classes/mixins/step';

    export default {

        components: { Step, CardSection, Perpetrator },

        props: {
            form: { required: true },
        },

        data() {
            return {
                next_step: 'witnesses',
                previous_step: 'stolen_properties',
                this_step: 'perpetrators',
            };
        },

        methods: {
            addPerpetrator() {
                this.form.addPerpetrator();
            },

            removePerpetrator(index) {
                this.form.removePerpetrator(index);
            },

            error(index) {
                return this.form.errors.perpetrators[index];
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
