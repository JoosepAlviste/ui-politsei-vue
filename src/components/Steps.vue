<template>

    <div class="steps col-sm-12 col-md-6">

        <step-tabs
                :active_tab="currentStep"
                @tab-was-activated="activateStep">
        </step-tabs>

        <keep-alive>
            <transition name="steps-swipe"
                        enter-active-class="animated fadeInRight"
                        leave-active-class="animated fadeOutLeft">
                <component class="step"
                           :is="currentStep"
                           :form="form"
                           @step-was-activated="activateStep">
                </component>
            </transition>
        </keep-alive>

        <!-- TODO: Fix absolute height somehow better -->
        <component class="step hidden"
                   :is="currentStep"
                   :form="form"
                   @step-was-activated="activateStep">
        </component>

    </div>


</template>

<script>
    import PersonData from '../steps/PersonData.vue';
    import EventInfo from '../steps/EventInfo.vue';
    import StolenProperties from '../steps/StolenProperties.vue';
    import StepTabs from './StepTabs.vue';
    import Perpetrators from '../steps/Perpetrators.vue';
    import Witnesses from '../steps/Witnesses.vue';
    import Intro from '../steps/Intro.vue';

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
            }
        }
    }
</script>
