<template>

    <div class="container-fluid d-flex justify-content-center">
        <div class="steps col-sm-12 col-md-8">

            <step-tabs
                    :active_tab="currentStep"
                    @tab-was-activated="activateStep">
            </step-tabs>

        </div>

        <div class="cardContainer justify-content-center col-sm-12 col-md-6">
            <keep-alive>
                <transition name="steps-swipe"
                            enter-active-class="animated fadeInRight"
                            leave-active-class="animated fadeOutLeft">
                    <component class="step"
                               :is="currentStep"
                               :form="form"
                               @step-was-activated="activateStep"
                               @form-was-submitted="submitForm">
                    </component>
                </transition>
            </keep-alive>

            <!-- TODO: Fix absolute height somehow better -->
            <component class="step hidden"
                       :is="currentStep"
                       :form="form">
            </component>

        </div>
    </div>


</template>

<script>
    import StepTabs from './StepTabs.vue';
    import Intro from '../steps/Intro.vue';
    import PersonData from '../steps/PersonData.vue';
    import EventInfo from '../steps/EventInfo.vue';
    import StolenProperties from '../steps/StolenProperties.vue';
    import Perpetrators from '../steps/Perpetrators.vue';
    import Witnesses from '../steps/Witnesses.vue';
    import SubmittedStep from '../steps/SubmittedStep.vue';
    import ConfirmStep from '../steps/ConfirmStep.vue';

    export default {

        props: {
            form: { required: true },
        },

        components: {
            intro: Intro,
            person_data: PersonData,
            event_info: EventInfo,
            stolen_properties: StolenProperties,
            perpetrators: Perpetrators,
            witnesses: Witnesses,
            confirm_step: ConfirmStep,
            submitted_step: SubmittedStep,
            StepTabs,
        },

        data() {
            return {
                currentStep: 'intro'
            };
        },

        methods: {

            activateStep(stepName) {
                this.currentStep = stepName;
                setTimeout(() => {
                    window.jump('body', {
                        duration: 200,
                    });
                }, 100);
            },

            submitForm() {
                this.activateStep('submitted_step');
            }
        }
    }
</script>
