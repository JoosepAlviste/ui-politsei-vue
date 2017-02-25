<template>
    <div id="app">

        <steps></steps>

    </div>
</template>

<script>
    import Steps from './components/Steps.vue';

    export default {
        name: 'app',
        components: { Steps }
    }
</script>

<style lang="scss">
    @import 'assets/scss/style.scss';
</style>
