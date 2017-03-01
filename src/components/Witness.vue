<template>
    <div class="card">

        <div class="card-header removable-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Tunnistaja #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('witness-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
                <div class="row">
                    <form-input
                            :name="'witness[' + nr + '][first_name]'"
                            label="Eesnimi"
                            :error="errors['first_name']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="witness.first_name"
                            :required="false"
                            @input-was-changed="onInputChange('first_name', $event)"
                            @input-was-blurred="onInputBlurred('first_name', $event)">
                    </form-input>
                    <form-input
                            :name="'witness[' + nr + '][last_name]'"
                            label="Perenimi"
                            :error="errors['last_name']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="witness.last_name"
                            :required="false"
                            @input-was-changed="onInputChange('last_name', $event)"
                            @input-was-blurred="onInputBlurred('last_name', $event)">
                    </form-input>
                </div>

                <div class="row">
                    <form-input
                            name="'witness[' + nr + '][date_of_birth]'"
                            label="Sünniaeg"
                            :error="errors['date_of_birth']"
                            class_name="col-sm-8 col-md-6"
                            :input_value="witness.date_of_birth"
                            :required="false"
                            help_text="Formaadis pp.kk.aaaa"
                            @input-was-changed="onInputChange('date_of_birth', $event)"
                            @input-was-blurred="onInputBlurred('date_of_birth', $event)">
                    </form-input>
                    <form-input
                            name="'witness[' + nr + '][personal_code]'"
                            label="Isikukood"
                            :error="errors['personal_code']"
                            class_name="col-sm-8 col-md-6"
                            :input_value="witness.personal_code"
                            :required="false"
                            @input-was-changed="onInputChange('personal_code', $event)"
                            @input-was-blurred="onInputBlurred('personal_code', $event)">
                    </form-input>
                </div>


                <div class="row">
                    <form-select
                            name="'witness[' + nr + '][citizenship]'"
                            label="Kodakondsus"
                            :error="errors['citizenship']"
                            :input_value="witness.citizenship"
                            :required="false"
                            :values="form.countries"
                            class_name="col-sm-8 col-md-4"
                            @input-was-changed="onInputChange('citizenship', $event)"
                            @input-was-blurred="onInputBlurred('citizenship', $event)">
                    </form-select>
                </div>
            </card-section>

            <card-section>
                <div class="row">
                    <form-input
                            name="'witness[' + nr + '][address]'"
                            label="Aadress"
                            :error="errors['profession']"
                            class_name="col-sm-12 col-md-12"
                            :input_value="witness.address"
                            :required="false"
                            @input-was-changed="onInputChange('address', $event)"
                            @input-was-blurred="onInputBlurred('address', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            name="'witness[' + nr + '][email]'"
                            label="Email"
                            :error="errors['email']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="witness.email"
                            :required="false"
                            @input-was-changed="onInputChange('email', $event)"
                            @input-was-blurred="onInputBlurred('email', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            name="'witness[' + nr + '][phone]'"
                            label="Telefoninumber"
                            :error="errors['phone']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="witness.phone"
                            :required="false"
                            @input-was-changed="onInputChange('phone', $event)"
                            @input-was-blurred="onInputBlurred('phone', $event)">
                    </form-input>
                </div>


            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';
    import FormSelect from './bootstrap/FormSelect.vue';

    import StepListingItemMixin from '../classes/mixins/stepListingItem';

    export default {

        mixins: [ StepListingItemMixin ],

        components: { CardSection, FormInput, FormSelect },

        props: {
            witness: { required: true },
        },
    }
</script>
