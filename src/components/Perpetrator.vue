<template>
    <div class="card">

        <div class="card-header removable-header perpetrator-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Süüteo toime pannud isik #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('perpetrator-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
                <div class="row">
                    <form-input
                            :name="'perpetrator[' + nr + '][first_name]'"
                            label="Eesnimi"
                            :error="errors['first_name']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="perpetrator.first_name"
                            :required="false"
                            @input-was-changed="onInputChange('first_name', $event)"
                            @input-was-blurred="onInputBlurred('first_name', $event)">
                    </form-input>
                    <form-input
                            :name="'perpetrator[' + nr + '][last_name]'"
                            label="Perenimi"
                            :error="errors['last_name']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="perpetrator.last_name"
                            :required="false"
                            @input-was-changed="onInputChange('last_name', $event)"
                            @input-was-blurred="onInputBlurred('last_name', $event)">
                    </form-input>
                </div>

                <div class="row">
                    <form-input
                            name="'perpetrator[' + nr + '][date_of_birth]'"
                            label="Sünniaeg"
                            :error="errors['date_of_birth']"
                            class_name="col-sm-8 col-md-6"
                            :input_value="perpetrator.date_of_birth"
                            :required="false"
                            help_text="Formaadis pp.kk.aaaa"
                            @input-was-changed="onInputChange('date_of_birth', $event)"
                            @input-was-blurred="onInputBlurred('date_of_birth', $event)">
                    </form-input>
                    <form-input
                            name="'perpetrator[' + nr + '][personal_code]'"
                            label="Isikukood"
                            :error="errors['personal_code']"
                            class_name="col-sm-8 col-md-6"
                            :input_value="perpetrator.personal_code"
                            :required="false"
                            @input-was-changed="onInputChange('personal_code', $event)"
                            @input-was-blurred="onInputBlurred('personal_code', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-select
                            name="'perpetrator[' + nr + '][citizenship]'"
                            label="Kodakondsus"
                            :error="errors['citizenship']"
                            :input_value="perpetrator.citizenship"
                            :required="false"
                            :values="form.countries"
                            class_name="col-sm-8 col-md-4"
                            @input-was-changed="onInputChange('citizenship', $event)">
                    </form-select>
                </div>
            </card-section>

            <card-section>
                <div class="row">
                    <form-input
                            name="'perpetrator[' + nr + '][address]'"
                            label="Aadress"
                            :error="errors['profession']"
                            class_name="col-sm-12 col-md-12"
                            :input_value="perpetrator.address"
                            :required="false"
                            @input-was-changed="onInputChange('address', $event)"
                            @input-was-blurred="onInputBlurred('address', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            name="'perpetrator[' + nr + '][email]'"
                            label="Email"
                            :error="errors['email']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="perpetrator.email"
                            :required="false"
                            @input-was-changed="onInputChange('email', $event)"
                            @input-was-blurred="onInputBlurred('email', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            name="'perpetrator[' + nr + '][phone]'"
                            label="Telefoninumber"
                            :error="errors['phone']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="perpetrator.phone"
                            :required="false"
                            @input-was-changed="onInputChange('phone', $event)"
                            @input-was-blurred="onInputBlurred('phone', $event)">
                    </form-input>
                </div>
            </card-section>

            <card-section>
                <div class="row">
                    <form-comment
                            name="'perpetrator[' + nr + '][special_indicators]'"
                            label="Eritunnused"
                            :error="errors['special_indicators']"
                            class_name="col"
                            :input_value="perpetrator.special_indicators"
                            :required="false"
                            @input-was-changed="onInputChange('special_indicators', $event)"
                            @input-was-blurred="onInputBlurred('special_indicators', $event)">
                    </form-comment>
                </div>
            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';
    import FormComment from './bootstrap/FormComment.vue';
    import FormSelect from './bootstrap/FormSelect.vue';

    import StepListingItemMixin from '../classes/mixins/stepListingItem';

    export default {

        mixins: [ StepListingItemMixin ],

        components: { CardSection, FormInput, FormComment, FormSelect },

        props: {
            perpetrator: { required: true },
        },
    }
</script>
