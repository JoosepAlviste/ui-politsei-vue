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
                            :name="'property[' + nr + '][year_bought]'"
                            label="Soetamise aasta"
                            :error="errors['year_bought']"
                            class_name="col"
                            :input_value="property.year_bought"
                            :required="false"
                            @input-was-changed="onYearBoughtChanged">
                    </form-year>
                </div>
              <div class="row">
                    <form-money
                              :name="'property[' + nr + '][property_value]'"
                            label="Ligikaudne hetkeväärtus"
                            :error="errors['property_value']"
                            class_name="col"
                            :input_value="property.property_value"
                            :required="false"
                            @input-was-changed="onPropertyValueChanged">
                    </form-money>
              </div>
              <div class="row">
                    <form-comment
                              :name="'property[' + nr + '][special_features]'"
                            label="Tundemärgid ja eritunnused (sh raaminumber, seerianumber, IMEI-kood jm)"
                            :error="errors['special_features']"
                            class_name="col"
                            :input_value="property.special_features"
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
            onYearBoughtChanged(year_bought){
                this.property.year_bought = year_bought;
                this.form.validate('stolen_properties', 'year_bought', this.nr - 1);
            },
            onPropertyValueChanged(property_value){
                this.property.property_value = property_value;
                this.form.validate('stolen_properties', 'property_value', this.nr - 1);
            },
            onCommentChanged(special_features){
                this.property.special_features = special_features;
                this.form.validate('stolen_properties', 'special_features', this.nr - 1);
            }
        },
    }
</script>
