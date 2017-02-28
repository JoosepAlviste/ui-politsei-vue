<template>
    <step title="Tunnistajad">

        <card-section>

            <witness v-for="(witness, index) in form.witnesses"
                     :witness="witness"
                     :nr="index + 1"
                     :errors="error(index)"
                     :form="form"
                     @witness-was-removed="removeWitness(index)">
            </witness>

            <div class="row addBtnContainer">
                <a href="" class="btn btn-primary" @click.prevent="addWitness">
                    Lisa tunnistaja
                </a>
            </div>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import Witness from '../components/Witness.vue';
    import StepMixin from '../classes/mixins/step';

    export default {

        components: { Step, CardSection, Witness },

        props: {
            form: {required: true},
        },

        data() {
            return {
                next_step: 'confirm_step',
                previous_step: 'perpetrators',
                this_step: 'witnesses',
            };
        },

        methods: {
            addWitness() {
                this.form.addWitness();
            },

            removeWitness(index) {
                this.form.removeWitness(index);
            },

            error(index) {
                return this.form.errors.witnesses[index];
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
