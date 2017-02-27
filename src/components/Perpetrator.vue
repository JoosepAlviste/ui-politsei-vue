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
                            @input-was-changed="onFirstNameChanged">
                    </form-input>
                    <form-input
                            :name="'perpetrator[' + nr + '][last_name]'"
                            label="Perenimi"
                            :error="errors['last_name']"
                            class_name="col-sm-12 col-md-6"
                            :input_value="perpetrator.last_name"
                            :required="false"
                            @input-was-changed="onLastNameChanged">
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
                            @input-was-changed="onDateOfBirthChanged">
                     </form-input>
                    <form-input
                          name="'perpetrator[' + nr + '][personal_code]'"
                          label="Isikukood"
                          :error="errors['personal_code']"
                          class_name="col-sm-8 col-md-6"
                          :input_value="perpetrator.personal_code"
                          :required="false"
                          @input-was-changed="onPersonalCodeChanged">
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
                            @input-was-changed="onCitizenshipChanged">
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
                            @input-was-changed="onAddressChanged">
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
                            @input-was-changed="onEmailChanged">
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
                            @input-was-changed="onPhoneChanged">
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
                            @input-was-changed="onSpecialIndicatorsChanged">
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

    export default {

        components: { CardSection, FormInput, FormComment, FormSelect },

        props: {
            perpetrator: { required: true },
            nr: { required: true },
            errors: { required: true },
            form: { required: true },
        },

        data() {
            return {
                isOpen: true
            };
        },

         methods: {
            onFirstNameChanged(name) {
                this.perpetrator.first_name = name;
                this.form.validate('perpetrators', 'first_name', this.nr - 1);
            },
          onLastNameChanged(name) {
                this.perpetrator.last_name = name;
                this.form.validate('perpetrators', 'last_name', this.nr - 1);
            },
          onDateOfBirthChanged(date) {
                this.perpetrator.date_of_birth = date;
                this.form.validate('perpetrators', 'date_of_birth', this.nr - 1);
            },
          onPersonalCodeChanged(id_code) {
                this.perpetrator.personal_code = id_code;
                this.form.validate('perpetrators', 'personal_code', this.nr - 1);
            },
          onCitizenshipChanged(citizenship) {
                this.perpetrator.citizenship = citizenship;
                this.form.validate('perpetrators', 'citizenship', this.nr - 1);
            },
          onProfessionChanged(newVal) {
                this.perpetrator.profession = newVal;
                this.form.validate('perpetrators', 'profession', this.nr - 1);
            },
          onEmailChanged(newVal) {
                this.perpetrator.email = newVal;
                this.form.validate('perpetrators', 'email', this.nr - 1);
            },
          onSpecialIndicatorsChanged(newVal) {
                this.perpetrator.special_indicators = newVal;
                this.form.validate('perpetrators', 'special_indicators', this.nr - 1);
            },
          onPhoneChanged(newVal) {
                this.perpetrator.phone = newVal;
                this.form.validate('perpetrators', 'phone', this.nr - 1);
            },
          onAddressChanged(newVal) {
                this.perpetrator.address = newVal;
                this.form.validate('perpetrators', 'address', this.nr - 1);
            }
        },
    }
</script>
