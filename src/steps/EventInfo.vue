<template>
    <step title="Toimumise info"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

        <card-section>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';

    export default {
        components: { Step, CardSection },

        data() {
            return {
                previous_step: 'person_data',
                next_step: '',
            };
        }
    }
</script>
