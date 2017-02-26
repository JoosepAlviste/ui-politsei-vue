<template>

    <div class="steps col-6">

        <div class="step-tabs">

            <button class="btn btn-primary"
               @click.prevent="activateStep('person_data')">
                Isikuandmed
            </button>

            <button class="btn btn-primary"
               @click.prevent="activateStep('event_info')">
                Toimumise info
            </button>

            <button class="btn btn-primary"
                    @click.prevent="activateStep('stolen_properties')">
                Varad
            </button>

        </div>

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
