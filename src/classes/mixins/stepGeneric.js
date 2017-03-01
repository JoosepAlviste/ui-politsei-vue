module.exports = {
    props: {
        $event: null,  // To avoid Variable or Prop does not exist "$event"
    },

    methods: {
        checkErrors(to, from) {
            this.form.validateAll(this.this_step);

            // If going back, don't take errors into account
            if (this.checkIfGoingBack(to, from)) {
                return false;
            }

            if (this.form.errors.has(this.this_step)) {

                // Wait with scroll because the form errors have not been rendered yet!
                // Must wait for Vue to update the HTML
                setTimeout(() => {
                    window.jump('.form-control-danger', {
                        duration: 200,
                        offset: -60,
                    });
                }, 100);

                return true;
            }

            return false;
        },

        checkIfGoingBack(to, from) {
            let routesList = [];
            window.routes.forEach(route => {
                routesList.push(route.name);
            });

            return routesList.indexOf(to.name) < routesList.indexOf(from.name);
        }
    }
};
