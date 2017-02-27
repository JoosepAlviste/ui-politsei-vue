<template>
    <step title="Kinnita avaldus"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)"
          @submit="$emit('form-was-submitted')">

        <card-section>
            <h6 class="card-title text-center confirm-text mb-0">
                Kõik esitatud andmed on õiged. Olen teadlik, et valeandmete esitamine on karistatav.
            </h6>
        </card-section>
        <card-section>
            <div class="row">
                <div class="form-group col-md-12 d-flex justify-content-center">
                    <label class="custom-control custom-checkbox">
                        <input type="checkbox" name="ok-with-deal" class="custom-control-input">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Olen nõus kokkuleppemenetlusega</span>
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12 d-flex justify-content-center">
                    <label class="custom-control custom-checkbox">
                        <input type="checkbox" name="info-e-toimik" class="custom-control-input">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Soovin teavet <a href="https://www.e-toimik.ee/">E-Toimiku</a> kaudu </span>
                    </label>
                </div>
            </div>
        </card-section>
    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import Checkbox from '../components/bootstrap/Checkbox.vue';

    import StepMixin from '../classes/mixins/step';

    export default {

        mixins: [ StepMixin ],

        components: { Step, CardSection, Checkbox },

        props: {
            form: { required: true },
        },

        data() {
            return {
                this_step: 'confirm',
                previous_step: 'witnesses',
                next_step: '',
            };
        },

        methods: {
            onDealChanged(deal) {
                this.set('ok-with-deal', deal);
            },

            onInfoToimikChanged(option) {
                this.set('info-e-toimik', option);
            }
        }
    }
</script>
