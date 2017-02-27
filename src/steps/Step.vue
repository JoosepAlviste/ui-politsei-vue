<template>

    <div class="card">

        <div class="card-header">

            <h2 class="card-title text-center">
                {{ title }}
            </h2>
        </div>

        <div class="list-group list-group-flush">

            <slot></slot>

            <card-section>

                <div class="col form-inline steps-buttons">
                    <a v-if="hasPrevious"
                       @click.prevent="$emit('previous-step')"
                       class="btn btn-secondary" href="#">
                        Tagasi
                    </a>

                    <a v-if="hasNext"
                       @click.prevent="$emit('next-step')"
                       class="btn btn-primary" href="#">
                        Edasi
                    </a>

                    <a v-else
                       @click.prevent="$emit('submit')"
                       class="btn btn-primary" href="#">
                        Esita avaldus
                    </a>
                </div>

            </card-section>
        </div>


    </div>
    
</template>

<script>
    import CardSection from '../components/CardSection.vue';

    export default {

        components: { CardSection },

        props: {
            title: { required: true }
        },

        computed: {
            hasPrevious() {
                return this.$parent.previous_step.length > 0;
            },

            hasNext() {
                return this.$parent.next_step.length > 0;
            }
        }
    }
</script>
