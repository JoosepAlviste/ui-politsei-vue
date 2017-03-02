<template>
    <step title="Kinnita avaldus"
          @submit="onSubmitted()">

        <card-section>
            <p class="card-title text-center confirm-text">
                Kõik esitatud andmed on õiged. Olen teadlik, et valeandmete esitamine on karistatav.
            </p>

            <div class="text-center">
                <checkbox
                        name="confirm-truth"
                        label="Kinnitan andmete õigsust"
                        :error="error('confirm-truth')"
                        :input_value="form.confirm['confirm-truth']"
                        :required="true"
                        @input-was-changed="onValueChanged('confirm-truth', $event)">
                </checkbox>
            </div>

        </card-section>

        <card-section>

            <div class="row">
                <div class="form-group col-md-12 d-flex justify-content-center options-div">
                    <label class="custom-control custom-checkbox">
                        <input type="checkbox" name="ok-with-deal"
                               class="custom-control-input"
                               v-model="ok_with_deal">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Olen nõus kokkuleppemenetlusega</span>
                    </label>
                    <div class="wrapper">
                        <svg fill="#292b2c" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                        </svg>
                        <div class="tooltip">Kokkuleppemenetlus on menetluse liik, mille käigus nõustuvad süüdistatav ja tema kaitsja süüdistuse sisu ja kuriteo kvalifikatsiooni, kuriteoga tekitatud kahju laadi ja suurusega ning jõuavad kokkuleppele prokuröri poolt kohtus nõutava karistuse liigis ja määras.</div>
                    </div>
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
                info_e_file: false,
                confirm_truth: false,
            };
        },

        watch: {
            ok_with_deal() {
                this.form.confirm['ok-with-deal'] = this.ok_with_deal;
            },

            info_e_file() {
                this.form.confirm['info-e-file'] = this.info_e_file;
            },

            confirm_truth() {
                this.form.confirm['confirm-truth'] = this.confirm_truth;
                this.validate('confirm-truth');
            }
        },

        mounted() {
            this.ok_with_deal = this.form.confirm['ok-with-deal'];
            this.info_e_file = this.form.confirm['info-e-file'];
        },

        methods: {
            onSubmitted() {
                this.form.validateAll();

                let errorStep = this.form.errors.hasAny();
                if (errorStep !== null) {
                    this.$router.push(errorStep);
                } else {
                    this.$router.push('submitted_step');
                }
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
