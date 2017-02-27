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
                            class_name="col-sm-12 col-md-8"
                            :input_value="witness.first_name"
                            :required="false"
                            @input-was-changed="onFirstNameChanged">
                    </form-input>
                    <form-input
                            :name="'witness[' + nr + '][last_name]'"
                            label="Perenimi"
                            :error="errors['last_name']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="witness.last_name"
                            :required="false"
                            @input-was-changed="onLastNameChanged">
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
                        @input-was-changed="onDateOfBirthChanged">
                 </form-input>
              </div>

              <div class="row">
                <form-input
                name="'witness[' + nr + '][personal_code]'"
                label="Isikukood"
                :error="errors['personal_code']"
                class_name="col-sm-8 col-md-6"
                :input_value="witness.personal_code"
                :required="false"
                @input-was-changed="onPersonalCodeChanged">
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
                        @input-was-changed="onCitizenshipChanged">
                </form-select>
              </div>
              <div class="row">
                <form-input
                        name="'witness[' + nr + '][profession]'"
                        label="Amet"
                        :error="errors['profession']"
                        class_name="col-sm-12 col-md-8"
                        :input_value="witness.profession"
                        :required="false"
                        @input-was-changed="onProfessionChanged">
                 </form-input>
              </div>
              <div class="row">
                <form-input
                        name="'witness[' + nr + '][address]'"
                        label="Aadress"
                        :error="errors['profession']"
                        class_name="col-sm-12 col-md-8"
                        :input_value="witness.address"
                        :required="false"
                        @input-was-changed="onAddressChanged">
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
                        @input-was-changed="onEmailChanged">
                 </form-input>
              </div>
              <div class="row">
                <form-input
                        name="'witness[' + nr + '][phone]'"
                        label="Telefoninumber"
                        :error="errors['phone']"
                        class_name="col-sm-12 col-md-8"
                        :input_value="witness.phone"
                        :required="false"
                        @input-was-changed="onPhoneChanged">
                 </form-input>
              </div>
              <div class="row">
                <form-comment
                        name="'witness[' + nr + '][special_indicators]'"
                        label="Eritunnused"
                        :error="errors['special_indicators']"
                        class_name="col"
                        :input_value="witness.special_indicators"
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
    import FormSelect from './bootstrap/FormSelect.vue';
    import FormComment from './bootstrap/FormComment.vue';

    export default {

        components: { CardSection, FormInput, FormSelect, FormComment },

        props: {
            witness: { required: true },
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
                this.witness.first_name = name;
                this.form.validate('witnesses', 'first_name', this.nr - 1);
            },
          onLastNameChanged(name) {
                this.witness.last_name = name;
                this.form.validate('witnesses', 'last_name', this.nr - 1);
            },
          onDateOfBirthChanged(date) {
                this.witness.date_of_birth = date;
                this.form.validate('witnesses', 'date_of_birth', this.nr - 1);
            },
          onPersonalCodeChanged(id_code) {
                this.witness.personal_code = id_code;
                this.form.validate('witnesses', 'personal_code', this.nr - 1);
            },
          onCitizenshipChanged(citizenship) {
                this.witness.citizenship = citizenship;
                this.form.validate('witnesses', 'citizenship', this.nr - 1);
            },
          onProfessionChanged(newVal) {
                this.witness.profession = newVal;
                this.form.validate('witnesses', 'profession', this.nr - 1);
            },
          onEmailChanged(newVal) {
                this.witness.email = newVal;
                this.form.validate('witnesses', 'email', this.nr - 1);
            },
          onSpecialIndicatorsChanged(newVal) {
                this.witness.special_indicators = newVal;
                this.form.validate('witnesses', 'special_indicators', this.nr - 1);
            },
          onPhoneChanged(newVal) {
                this.witness.phone = newVal;
                this.form.validate('witnesses', 'phone', this.nr - 1);
            },
          onAddressChanged(newVal) {
                this.witness.address = newVal;
                this.form.validate('witnesses', 'address', this.nr - 1);
            }
        },
    }
</script>
