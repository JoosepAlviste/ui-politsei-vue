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
                    <form-input
                            :name="'property[' + nr + '][year_bought]'"
                            label="Soetamise aasta"
                            :error="errors['year_bought']"
                            class_name="col"
                            :input_value="property.year_bought"
                            :required="false"
                            @input-was-changed="onYearBoughtChanged">
                    </form-input>
                    <form-money
                              :name="'property[' + nr + '][property_value]'"
                            label="Ligikaudne hetkeväärtus"
                            :error="errors['property_value']"
                            class_name="col"
                            :input_value="property.property_value"
                            :required="false"
                            @input-was-changed="onValueChanged">
                    </form-money>

                </div>
            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';
    import FormMoney from './bootstrap/FormMoney.vue';

    export default {

        components: { CardSection, FormInput },

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
            }
        },
    }
</script>
