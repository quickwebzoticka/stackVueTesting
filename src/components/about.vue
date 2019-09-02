<template>
    <div class="about">
        <h1>About component</h1>
        <div class="content">
            <custom-button
                :customTitle="'Increase'"
                :payload="1"
                @btnClicked="increaseCounter"
            ></custom-button>
            <custom-button
                :customTitle="'Add new phone'"
                @btnClicked="counterPhones++"
            ></custom-button>
            <input-phone v-for="i in counterPhones" @phoneClicked="checkPhone" :key="i"></input-phone>
        </div>
    </div>    
</template>

<script>
import button from './elements/button'
import inputPhone from './elements/inputPhone'

export default {
    components: {
        customButton: button,
        inputPhone
    },
    data () {
        return {
            counterPhones: 1
        }
    },
    methods: {
        increaseCounter (val) {
            this.$store.commit('counterUpdate', val)
        },
        checkPhone (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss">

</style>