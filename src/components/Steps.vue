<template>

    <div class="steps col-sm-12 col-md-6">

        <step-tabs
                :active_tab="currentStep"
                @tab-was-activated="activateStep">
        </step-tabs>

        <keep-alive>
            <component :is="currentStep"
                       :form="form"
                       @step-was-activated="activateStep">
            </component>
        </keep-alive>

    </div>


</template>

<script>
    import PersonData from '../steps/PersonData.vue';
    import EventInfo from '../steps/EventInfo.vue';
    import StolenProperties from '../steps/StolenProperties.vue';
    import StepTabs from './StepTabs.vue';
    import Perpetrators from '../steps/Perpetrators.vue';
    import Witnesses from '../steps/Witnesses.vue';

    export default {

        props: {
            form: { required: true },
        },

        components: {
            person_data: PersonData,
            event_info: EventInfo,
            stolen_properties: StolenProperties,
            perpetrators: Perpetrators,
            witnesses: Witnesses,
            StepTabs,
        },

        data() {
            return {
                currentStep: 'person_data'
            };
        },

        methods: {

            activateStep(stepName) {
                this.currentStep = stepName;
            }
        }
    }
</script>
