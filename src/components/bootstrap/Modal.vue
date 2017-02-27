<template>

    <transition name="modal-bg-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">

        <div class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true"
             v-show="active" @click="$emit('closed')">

            <transition name="modal-transition"
                        enter-active-class="animated fadeInDown"
                        leave-active-class="animated fadeOutUp">

                <div class="modal-dialog col" role="document" v-if="active" @click.prevent="handleModalClick">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                <slot name="title"></slot>
                            </h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                    @click="$emit('closed')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <slot></slot>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    @click="$emit('closed')">
                                Sulge
                            </button>

                            <button type="button" class="btn btn-primary" @click="$emit('confirmed')">
                                Logi sisse
                            </button>
                        </div>

                    </div>
                </div>
            </transition>

        </div>
    </transition>

</template>

<script>
    export default {

        props: {
            active: { required: true },
        },

        methods: {
            handleModalClick(event) {
                event.stopPropagation();
            }
        }
    }
</script>
