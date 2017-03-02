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

                    <router-link v-if="hasPrevious"
                                 :to="previousLink"
                                 class="btn btn-secondary">
                        Tagasi
                    </router-link>

                    <router-link v-if="hasNext"
                                 :to="nextLink"
                                 class="btn btn-primary">
                        Edasi
                    </router-link>

                    <a v-else href="#"
                       to="submitted_step"
                       class="btn btn-success"
                       @click.prevent="$emit('submit')">
                        Kinnita
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
            },

            previousLink() {
                return this.$parent.previous_step;
            },

            nextLink() {
                return this.$parent.next_step;
            }
        }
    }
</script>
