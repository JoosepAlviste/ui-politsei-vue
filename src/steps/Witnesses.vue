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

    import StepGenericMixin from '../classes/mixins/stepGeneric';

    export default {

        mixins: [ StepGenericMixin ],

        components: { Step, CardSection, Witness },

        props: {
            form: {required: true},
        },

        data() {
            return {
                next_step: 'confirm',
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

            if (this.checkErrors(to, from)) {
                return next(false);
            }

            return next();
        }
    }
</script>
