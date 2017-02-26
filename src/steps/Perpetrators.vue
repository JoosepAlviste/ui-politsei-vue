<template>
    <step title="Süüteo toime pannud isiku(te) andmed"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

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
    import Property from '../components/Property.vue';
    import Perpetrator from '../components/Perpetrator.vue';
    import StepMixin from '../classes/mixins/step';

    export default {

        components: { Step, CardSection, Perpetrator },

        props: {
            form: { required: true },
        },

        data() {
            return {
                next_step: '',
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
                console.log(this.form.errors.perpetrators);
                return this.form.errors.perpetrators[index];
            }
        }
    }
</script>
