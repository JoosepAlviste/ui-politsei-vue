<template>
    <div class="card text-center">

        <div class="card-header">
            <h2 class="card-title">
                Süüteost teatamise avaldus
            </h2>
        </div>
        <div class="list-group list-group-flush">
            <div class="list-group-item">
                <div class="card-block">
                    <h4 class="card-title">Täname!</h4>
                    <p class="card-text">Korrektse e-posti aadressi sisestamisel saabub süüteost teatamise avalduse koopia sisestatud e-posti aadressile hiljem ühe tööpäeva jooksul. Kui seda ei juhtu, võtke ühendust aadressil
                        <a href="mailto:ppa@politsei.ee">ppa@politsei.ee</a></p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        props: {
            form: { required: true },
        }
    }
</script>
