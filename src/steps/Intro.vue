<template>
    <step title="Alusta"
          @next-step="$emit('step-was-activated', next_step)"
          @previous-step="$emit('step-was-activated', previous_step)">

        <card-section>

            <p><strong>Kui kellegi elu või tervis on vahetult ohus, siis helista viivitamatult hädaabinumbrile 112.</strong></p>

            <p>Raskest ja/või isikuvastasest kuriteost teada andmiseks pöördu lähimasse politseijaoskonda.</p>

            <p>Avalduses ei tohi esitada valeandmeid.</p>

            <p>Vajadusel tuleb menetleja kutsel tulla politseijaoskonda täiendavate ütluste andmiseks.</p>

        </card-section>

        <card-section class="text-center">

            <h4 class="card-title">Sisene ID-kaardiga</h4>
            <p>ID-kaardiga sisenedes täidetakse automaatselt Sinu isikuandmete väljad</p>

            <a href="#" class="id-card-btn" @click.prevent="onIdCardLogin">
                <img src="static/id-kaart-logo-uus.png" alt="Logi sisse ID-kaardiga">
            </a>
            <a href="#" class="id-card-btn" @click.prevent="onIdCardLogin">
                <img src="static/mid-logo-uus.png" alt="Logi sisse mobiil-IDga">
            </a>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';

    export default {

        components: { Step, CardSection },

        props: {
            form: { required: true },
        },

        data() {
            return {
                this_step: 'intro',
                previous_step: '',
                next_step: 'person_data',
            };
        },

        methods: {
            onIdCardLogin() {
                this.form.loggedInWithIdCard();
                this.$emit('step-was-activated', this.next_step);
            }
        }
    }
</script>
