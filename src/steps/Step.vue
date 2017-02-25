<template>

    <div class="card">

        <div class="card-header">

            <h4 class="card-title text-center">
                {{ title }}
            </h4>
        </div>

        <div class="list-group list-group-flush">

            <slot></slot>

        </div>

    </div>
    
</template>

<script>
    export default {

        props: {
            title: { required: true }
        }
    }
</script>
