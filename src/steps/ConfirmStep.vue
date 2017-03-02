<template>
    <step title="Kinnita avaldus"
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
                        <input type="checkbox" name="ok-with-deal"
                               class="custom-control-input"
                               v-model="ok_with_deal">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Olen nõus kokkuleppemenetlusega</span>
                    </label>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-12 d-flex justify-content-center">
                    <label class="custom-control custom-checkbox">

                        <input type="checkbox" name="info-e-toimik"
                               class="custom-control-input"
                               v-model="info_e_file">

                        <span class="custom-control-indicator"></span>

                        <span class="custom-control-description">
                            Soovin teavet
                            <a href="https://www.e-toimik.ee/" target="_blank">
                                E-Toimiku
                            </a>
                            kaudu
                        </span>

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

    import StepGenericMixin from '../classes/mixins/stepGeneric';
    import StepMixin from '../classes/mixins/step';

    export default {

        mixins: [ StepGenericMixin, StepMixin ],

        components: { Step, CardSection, Checkbox },

        props: {
            form: { required: true },
        },

        data() {
            return {
                this_step: 'confirm',
                previous_step: 'witnesses',
                next_step: '',

                ok_with_deal: false,
                info_e_file: false
            };
        },

        watch: {
            ok_with_deal() {
                this.form.options['ok-with-deal'] = this.ok_with_deal;
            },

            info_e_file() {
                this.form.options['info-e-file'] = this.info_e_file;
            }
        },

        mounted() {
            this.ok_with_deal = this.form.options['ok-with-deal'];
            this.info_e_file = this.form.options['info-e-file'];
        },

        beforeRouteLeave (to, from, next) {

            if (this.checkErrors(to, from)) {
                return next(false);
            }

            return next();
        }
    }
</script>
