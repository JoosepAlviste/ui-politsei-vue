<template>
    <div id="app">

        <div class="container-fluid d-flex justify-content-center">
            <steps></steps>
        </div>

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
