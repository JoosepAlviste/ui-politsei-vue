<template>
    <step title="Ära võetud/saamata jäänud vara">

        <card-section>

            <property v-for="(property, index) in form.stolen_properties"
                      :property="property"
                      :nr="index + 1"
                      :errors="error(index)"
                      :form="form"
                      @property-was-removed="removeProperty(index)">
            </property>

            <div class="row addBtnContainer">
                <a href="" class="btn btn-primary" @click.prevent="addProperty">
                    Lisa vara
                </a>
            </div>

        </card-section>

    </step>
</template>

<script>
    import Step from './Step.vue';
    import CardSection from '../components/CardSection.vue';
    import Property from '../components/Property.vue';

    import StepMixin from '../classes/mixins/step';

    export default {

        components: { Step, CardSection, Property },

        props: {
            form: { required: true },
        },

        data() {
            return {
                next_step: 'perpetrators',
                previous_step: 'event_info',
                this_step: 'stolen_properties',
            };
        },

        methods: {
            addProperty() {
                this.form.addStolenProperty();
            },

            removeProperty(index) {
                this.form.removeStolenProperty(index);
            },

            error(index) {
                return this.form.errors.stolen_properties[index];
            }
        },

        beforeRouteLeave (to, from, next) {
            this.form.validateAll(this.this_step);

            if (this.form.errors.has(this.this_step)) {

                // Wait with scroll because the form errors have not been rendered yet!
                // Must wait for Vue to update the HTML
                setTimeout(() => {
                    window.jump('.form-control-danger', {
                        duration: 200,
                        offset: -60,
                    });
                }, 100);

                return next(false);
            }

            next();
        }
    }
</script>
