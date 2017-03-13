<template>
    <div class="card">

        <div class="card-header removable-header property-header" :class="{ 'is-open' : isOpen, 'is-closed' : !isOpen }" @click="isOpen = !isOpen">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     viewBox="0 0 292.362 292.362" style="enable-background:new 0 0 292.362 292.362;"
                     xml:space="preserve">
                <g>
                    <path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
                        C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
                        s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"/>
                </g>
                </svg>
            </span>
            
            <h4 class="card-title text-center">
                Vara #{{ nr }} <span v-if="property.name != ''"> - {{ property.name }}</span>
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
                            @input-was-changed="onInputChange('name', $event)"
                            @input-was-blurred="onInputBlurred('name', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            :name="'property[' + nr + '][year_of_acquiring]'"
                            label="Soetamise aasta"
                            :error="errors['year_of_acquiring']"
                            class_name="col"
                            input_class="col-md-4 col-sm-6"
                            :input_value="property.year_of_acquiring"
                            :required="false"
                            @input-was-changed="onInputChange('year_of_acquiring', $event)"
                            @input-was-blurred="onInputBlurred('year_of_acquiring', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-money
                            :name="'property[' + nr + '][value]'"
                            label="Ligikaudne hetkeväärtus"
                            :error="errors['value']"
                            class_name="col"
                            :input_value="property.value"
                            :required="false"
                            @input-was-changed="onInputChange('value', $event)"
                            @input-was-blurred="onInputBlurred('value', $event)">
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
                            @input-was-changed="onInputChange('special_indicators', $event)">
                    </form-comment>
                </div>
                <div class="row">
                    <form-input
                            name="property_exists_time"
                            label="Vara viimati kannatanul/teatajal olemas"
                            :error="errors['property_exists_time']"
                            class_name="col-sm-6"
                            :input_value="property.property_exists_time"
                            :required="false"
                            help_text="Formaadis pp.kk.aaaa (hh:mm) - kellaaeg on valikuline"
                            @input-was-changed="onInputChange('property_exists_time', $event)"
                            @input-was-blurred="onInputBlurred('property_exists_time', $event)">
                    </form-input>
                </div>
                <div class="row">
                    <form-input
                            name="property_lost_time"
                            label="Vara kaotus tuvastatud"
                            :error="errors['property_lost_time']"
                            class_name="col-sm-6"
                            :input_value="property.property_lost_time"
                            :required="false"
                            help_text="Formaadis pp.kk.aaaa (hh:mm) - kellaaeg on valikuline"
                            @input-was-changed="onInputChange('property_lost_time', $event)"
                            @input-was-blurred="onInputBlurred('property_lost_time', $event)">
                    </form-input>
                </div>
            </card-section>
            <card-section>
                <div class="row">
                    <file-input
                            name="property-file"
                            label="Lisa pilt/video varast"
                            class_name="col-md-6">
                    </file-input>
                </div>
            </card-section>
        </div>

    </div>
</template>

<script>
    import CardSection from './CardSection.vue';
    import FormInput from './bootstrap/FormInput.vue';
    import FormMoney from './bootstrap/FormMoney.vue';
    import FormNumber from './bootstrap/FormNumber.vue';
    import FormComment from './bootstrap/FormComment.vue';
    import FileInput from './bootstrap/FileInput.vue';

    import StepListingItemMixin from '../classes/mixins/stepListingItem';

    export default {

        mixins: [ StepListingItemMixin ],

        components: { CardSection, FormInput, FormMoney, FormNumber, FormComment, FileInput },

        props: {
            property: { required: true },
        },
    }
</script>
