<template>
    <step title="Ära võetud/viidud/saamata jäänud vara"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

        <card-section>

            <div v-for="(properties, index) in form.stolen_properties"
                 class="card">

                <div class="card-header">
                    <h4 class="card-title text-center">
                        Vara #{{ index + 1 }}
                    </h4>

                    <button type="button" class="close" aria-label="Close"
                            @click.prevent="removeProperty(index)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <card-section>
                    <div class="row">

                        Hello World!

                    </div>
                </card-section>

            </div>

            <a href="" class="btn btn-primary" @click.prevent="addProperty">
                Lisa vara
            </a>

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
                next_step: '',
                previous_step: 'event_info',
                this_step: 'stolen_property',
            };
        },

        methods: {
            addProperty() {
                this.form.addStolenProperty();
            },

            removeProperty(index) {
                this.form.removeStolenProperty(index);
            }
        }
    }
</script>
