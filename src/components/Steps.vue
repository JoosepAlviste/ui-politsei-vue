<template>

    <div class="steps col-md-12">

        <ol class="step-tabs">

            <li class="step-btn is-complete"
                data-step="1"
                @click.prevent="activateStep('person_data')">
                Isikuandmed
            </li>

            <li class="step-btn is-active"
                data-step="2"
                @click.prevent="activateStep('event_info')">
                Toimumise info
            </li>

            <li class="step-btn"
                data-step="3"
                @click.prevent="activateStep('stolen_properties')">
                Varad
            </li>

        </ol>

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

    export default {

        props: {
            form: { required: true },
        },

        components: {
            person_data: PersonData,
            event_info: EventInfo,
            stolen_properties: StolenProperties,
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
