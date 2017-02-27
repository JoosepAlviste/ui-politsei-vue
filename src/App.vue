<template>
    <div id="app">

        <steps :form="form"></steps>

    </div>
</template>

<script>
    import Steps from './components/Steps.vue';
    import Form from './classes/Form';

    export default {
        name: 'app',

        components: { Steps },

        data() {
            return {
                form: new Form()
            };
        }
    }
</script>

<style lang="scss">
    @import 'assets/scss/style.scss';
</style>
