<template>
    <div id="app">

        <div class="container-fluid d-flex justify-content-center">
            <steps :errors="errors"></steps>
        </div>

    </div>
</template>

<script>
    import Steps from './components/Steps.vue';
    import Errors from './classes/Errors';

    export default {
        name: 'app',

        components: { Steps },

        data() {
            return {
                errors: new Errors()
            };
        }
    }
</script>

<style lang="scss">
    @import 'assets/scss/style.scss';
</style>
