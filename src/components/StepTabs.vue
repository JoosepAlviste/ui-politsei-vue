<template>

    <ol class="step-tabs">

        <li v-for="(tab, index) in tabs"
            class="step-btn"
            :class="{ 'is-active': active_tab === tab.slug, 'is-complete': isComplete(tab) }"
            :data-step="index + 1"
            @click.prevent="$emit('tab-was-activated', tab.slug)">
            {{ tab.name }}
        </li>

    </ol>

</template>

<script>
    export default {

        props: {
            active_tab: { required: true },
        },

        data() {
            return {
                tabs: [
                    {
                        slug: 'person_data',
                        name: 'Isikuandmed',
                    },
                    {
                        slug: 'event_info',
                        name: 'Toimumise info',
                    },
                    {
                        slug: 'stolen_properties',
                        name: 'Varad',
                    }
                ],
            };
        },

        methods: {
            isComplete(tab) {
                let complete = false;
                let activeSeen = false;
                this.tabs.forEach(tabLoop => {
                    if (tabLoop.slug === this.active_tab) {
                        activeSeen = true;
                    }

                    if (!activeSeen && tab.slug === tabLoop.slug) {
                        complete = true;
                    }
                });

                return complete;
            }
        }
    }
</script>
