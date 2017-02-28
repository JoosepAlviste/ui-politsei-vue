<template>

    <div class="container-fluid d-flex justify-content-center">

        <transition name="step-tabs-fade"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="steps col-sm-12 col-md-8" v-if="!isSubmittedStep">
                <step-tabs></step-tabs>
            </div>
            <div class="submitted-card-top" v-else></div>
        </transition>

        <div class="cardContainer justify-content-center col-sm-12 col-md-6">

            <transition name="steps-swipe"
                        enter-active-class="animated fadeInRight"
                        leave-active-class="animated fadeOutLeft">
                <router-view class="step" :form="form"></router-view>
            </transition>

            <!-- TODO: Fix absolute height somehow better -->
            <router-view class="step hidden" :form="form"></router-view>

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
                currentStep: 'intro',
            };
        },

        computed: {
            isSubmittedStep() {
                return this.$route.path === '/submitted_step';
            }
        }
    }
</script>
