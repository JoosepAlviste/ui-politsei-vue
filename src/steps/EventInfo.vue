<template>
    <step title="Toimumise info">

        <card-section>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';

    export default {
        components: { Step, CardSection },

        props: {
            form: { required: true },
        },

        data() {
            return {
                previous_step: 'person_data',
                next_step: 'stolen_properties',
                this_step: 'event_info',
            };
        }
    }
</script>
