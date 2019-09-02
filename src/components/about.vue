<template>
    <div class="about">
        <h1>About component</h1>
        <div class="content">
            <custom-button
                :payload="1"
                @btnClicked="updateCounter"
            >
                Increase
            </custom-button>
            <custom-button
                :payload="1"
                @btnClicked="updateCountPhones"
            >
                Add new phone
            </custom-button>
            <custom-button
                :payload="-1"
                @btnClicked="updateCountPhones"
            >
                Remove last phone
            </custom-button>
            <transition-group name="slideDown" mode="out-in">
                <input-phone 
                    v-for="i in $store.state.phones"
                    @phoneClicked="checkPhone"
                    :key="i"
                    :style="{ zIndex: 100 - i}"
                ></input-phone>
            </transition-group>
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
    methods: {
        updateCountPhones (val) {
            this.$store.commit('updateCountPhones', val)
        },
        checkPhone (val) {
            console.log(val)
        },
        updateCounter (val) {
            this.$store.commit('counterUpdate', val)
        }
    }
}
</script>

<style lang="scss">
.input-phone {
    transition: 1s ease-in-out;
    z-index: 100;
    background: #FFFFFF;
    position: relative;
}

.slideDown-enter {
  opacity: 0;
  transform: translateY(-50px);
}
.slideDown-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.slideDown-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
.slideDown-enter-active, .slide-leave-active {
  transition: 1s ease-in-out;
}
.slideDown-move {
  transition: 1s ease-in-out;
}
</style>