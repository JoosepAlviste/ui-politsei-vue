<template>

    <keep-alive>
        <component v-bind:is="currentStep">
            <!-- component changes when vm.currentView changes! -->
        </component>
    </keep-alive>

</template>

<script>
    import PersonData from '../steps/PersonData.vue';
    import EventInfo from '../steps/EventInfo.vue';

    export default {

        components: {
            person_data: PersonData,
            event_info: EventInfo
        },

        data() {
            return {
                currentStep: 'person_data'
            };
        },
    }
</script>
