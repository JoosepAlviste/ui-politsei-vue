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

    import StepGenericMixin from '../classes/mixins/stepGeneric';

    export default {

        mixins: [ StepGenericMixin ],

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

            if (this.checkErrors(to, from)) {
                return next(false);
            }

            return next();
        }
    }
</script>
