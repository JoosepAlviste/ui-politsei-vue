<template>
    <div class="card">

        <div class="card-header property-header" @click="isOpen = !isOpen">
            <h4 class="card-title text-center">
                Vara #{{ nr }}
            </h4>

            <button type="button" class="close" aria-label="Close"
                    @click.prevent="$emit('property-was-removed')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div v-if="isOpen">
            <card-section>
              <div class="row">

                    <form-input
                            :name="'property[' + nr + '][name]'"
                            label="Nimetus"
                            :error="errors['name']"
                            class_name="col-sm-12 col-md-8"
                            :input_value="property.name"
                            :required="true"
                            @input-was-changed="onNameChanged">
                    </form-input>
              </div>
              <div class="row">
                    <form-year
                            :name="'property[' + nr + '][year_of_acquiring]'"
                            label="Soetamise aasta"
                            :error="errors['year_of_acquiring']"
                            class_name="col"
                            :input_value="property.year_of_acquiring"
                            :required="false"
                            @input-was-changed="onYearBoughtChanged">
                    </form-year>
                </div>
              <div class="row">
                    <form-money
                              :name="'property[' + nr + '][value]'"
                            label="Ligikaudne hetkeväärtus"
                            :error="errors['value']"
                            class_name="col"
                            :input_value="property.value"
                            :required="false"
                            @input-was-changed="onValueChanged">
                    </form-money>
              </div>
              <div class="row">
                    <form-comment
                              :name="'property[' + nr + '][special_indicators]'"
                            label="Tundemärgid ja eritunnused (sh raaminumber, seerianumber, IMEI-kood jm)"
                            :error="errors['special_indicators']"
                            class_name="col"
                            :input_value="property.special_indicators"
                            :required="false"
                            @input-was-changed="onCommentChanged">
                    </form-comment>
              </div>
            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';
    import FormMoney from './bootstrap/FormMoney.vue';
    import FormYear from './bootstrap/FormYear.vue';
    import FormComment from './bootstrap/FormComment.vue';

    export default {

        components: { CardSection, FormInput, FormMoney, FormYear, FormComment },

        props: {
            property: { required: true },
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
            onNameChanged(name) {
                this.property.name = name;
                this.form.validate('stolen_properties', 'name', this.nr - 1);
            },
            onYearBoughtChanged(year_of_acquiring){
                this.property.year_of_acquiring = year_of_acquiring;
                this.form.validate('stolen_properties', 'year_of_acquiring', this.nr - 1);
            },
            onValueChanged(value){
                this.property.value = value;
                this.form.validate('stolen_properties', 'value', this.nr - 1);
            },
            onCommentChanged(special_indicators){
                this.property.special_indicators = special_indicators;
                this.form.validate('stolen_properties', 'special_indicators', this.nr - 1);
            }
        },
    }
</script>
