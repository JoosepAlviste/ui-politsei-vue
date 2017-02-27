<template>
    <ol class="step-tabs">

        <router-link v-for="(tab, index) in tabs" v-if="tab.name !== 'submitted_step'"
                     :to="tab.path"
                     class="step-btn"
                     :class="{ 'is-complete': isComplete(tab) }"
                     :data-step="index + 1"
                     tag="li">
            {{ tab.title }}
        </router-link>

    </ol>
</template>

<script>
    import routes from '../routes';

    export default {

        data() {
            return {
                tabs: routes
            };
        },

        methods: {
            isComplete(tab) {
                let complete = false;
                let activeSeen = false;
                this.tabs.forEach(tabLoop => {
                    if (tabLoop.path === this.$route.path || tabLoop.alias ===  this.$route.path) {
                        activeSeen = true;
                    }

                    if (!activeSeen && tab.name === tabLoop.name) {
                        complete = true;
                    }
                });

                return complete;
            }
        }
    }
</script>
