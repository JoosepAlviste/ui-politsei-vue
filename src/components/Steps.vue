<template>

    <div class="steps col-6">

        <div class="step-tabs">

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

    export default {

        props: {
            form: { required: true },
        },

        components: {
            person_data: PersonData,
            event_info: EventInfo
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
