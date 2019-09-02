<template>
    <div class="home">
        <transition-group appear name="header">
            <h1 key="header">Home component</h1>
        </transition-group>
        
        <div class="content">
            <div class="input-wrapper">
                <input type="text" v-model="$v.login.$model" :class="{ errored : $v.login.$error }">
                <span v-if="$v.login.$error">Неправильный логин</span>
            </div>
            <div class="input-wrapper">
                <input type="password" v-model="$v.password.$model" :class="{ errored : $v.password.$error }">
                <span v-if="$v.password.$error">Неправильный пароль</span>
            </div>
            <div class="input-wrapper">
                <input type="email" v-model="$v.email.$model" :class="{ errored : $v.email.$error }">
                <span v-if="$v.email.$error">Неправильный емэйл</span>
            </div>
            <custom-button 
                :payload="1"
                @btnClicked="increaseCounter"
            >
                Increase Counter
            </custom-button>
            <custom-button 
                :payload="-1"
                @btnClicked="increaseCounter"
            >
                Decrease Counter
            </custom-button>
        </div>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import button from './elements/button'

const mustBeCool = value => value.indexOf('крутой') >= 0
const onlyEngLettersAndNumbers = value => {
    const pattern = new RegExp(/^([a-z0-9]+|\d+)$/i)
    return pattern.test(value)
}

export default {
    components: {
        customButton: button
    },
    data () {
        return {
            login: 'login',
            password: '',
            email: 'example@mail.com',
        }
    },
    validations: {
        login: {
            required,
            minLength: minLength(10)
        },
        password: {
            required,
            minLength: minLength(5)
        },
        email: {
            required,
            onlyEngLettersAndNumbers
        }
    },
    methods: {
        increaseCounter (val) {
            this.$store.commit('counterUpdate', val)
        }
    }
}
</script>

<style lang="scss">
    h1 {
        transform: translate(0px);
        transition: .3s ease-in-out;
    }
    h1.active {
        transform: translate(0px);
        transition: 3s;
    }
    input {
        width: 300px;
        height: 40px;
        border: 1px solid #3eaf7c;
        padding: 0 20px;
    }
    .input-wrapper {
        margin-bottom: 20px;
    }
    .errored {
        border: 1px solid red;
        color: red;
    }
    .temp {
        transform: none;
    }
    .header-enter {
        transform: translateX(-400px);
        opacity: 0;
    }
    .header-enter-to {
        transform: translateX(0px);
        opacity: 1;
    }
    .header-enter-active, .header-leave-to {
        transition: 1s ease-in-out;
    }
</style>