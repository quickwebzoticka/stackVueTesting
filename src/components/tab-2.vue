<template>
   <div class="tab">
       <div class="tab-head" animated>
           <h2>Информация о запрашиваем кредите</h2>
       </div>
        <label class="input-radio" :class="{ active: this.$store.state.tab2.creditPurpose === 'Новостройка' }" animated>
            <input type="radio" name="creditPurpose" value="Новостройка" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка квартиры в новостройке</span>
        </label>
        <label class="input-radio" :class="{ active: this.$store.state.tab2.creditPurpose === 'Готовая недвижимость' }" animated>
            <input type="radio" name="creditPurpose" value="Готовая недвижимость" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка квартиры в готовой недвижимости</span>
        </label>
        <label class="input-radio" :class="{ active: this.$store.state.tab2.creditPurpose === 'Коммерческая недвижимость' }" animated>
            <input type="radio" name="creditPurpose" value="Коммерческая недвижимость" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка коммерческой недвижимости</span>
        </label>
        <div class="input-wrapper" :class="{ error: $v.priceOfBuild.$error }" animated>
            <label>
                <div class="input-label">Стоимость {{ creditPurposeText }}</div>
                <input type="text" class="input-text" name="priceOfBuild" :value="priceOfBuild | money" @change="calcpriceOfBuild($event)">
                <div class="error" v-if="!$v.priceOfBuild.digits && $v.priceOfBuild.$dirty">Может содержать только число</div>
                <div class="error" v-if="!$v.priceOfBuild.required && $v.priceOfBuild.$dirty">Обязательное поле</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPayment.$error }" animated>
            <label>
                <div class="input-label">Первоначальный взнос</div>
                <input type="text" class="input-text" name="firstPayment" :value="firstPayment | money" @change="calcfirstPayment($event)">
                <div class="error" v-if="!$v.firstPayment.required && $v.firstPayment.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPayment.notHigher && $v.firstPayment.$dirty">Не должно быть выше стоимости недвижимости</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPaymentProcent.$error }" animated>
            <label>
                <div class="input-label">Первоначальный взнос в процентах</div>
                <input type="text" class="input-text" name="firstPaymentProcent" :value="firstPaymentProcent | procent" @change="calcfirstPaymentProcent($event)">
                <div class="error" v-if="!$v.firstPaymentProcent.required && $v.firstPaymentProcent.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPaymentProcent.procent && $v.firstPaymentProcent.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.summCredit.$error }" animated>
            <label>
                <div class="input-label">Сумма кредита</div>
                <input type="text" class="input-text" name="summCredit" :value="summCredit | money" @change="calcsummCredit($event)">
                <div class="error" v-if="!$v.summCredit.required && $v.summCredit.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.summCredit.notHigher && $v.summCredit.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <div class="tab-bottom" animated>
            <div class="button" @click="checkTab($event)" previous to="/">Назад</div>
            <div class="button" @click="checkTab($event)" to="third">Вперед</div>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { digits, procent, notHigher } from '../validations/validations'
import testValidations from '../validations/testValidations'

import { animate } from '../mixins/animate'

export default {
    data () {
        return {
            creditPurpose: this.$store.state.tab2.creditPurpose,
            priceOfBuild: this.$store.state.tab2.priceOfBuild,
            firstPayment: this.$store.state.tab2.firstPayment,
            firstPaymentProcent: this.$store.state.tab2.firstPaymentProcent,
            summCredit: this.$store.state.tab2.summCredit 
        }
    },
    computed: {
        creditPurposeText () {
            if (this.creditPurpose === 'Новостройка') return 'квартиры в новостройке'
            if (this.creditPurpose === 'Готовая недвижимость') return 'квартиры в готовой недвижимости'
            if (this.creditPurpose === 'Коммерческая недвижимость') return 'коммерческой недвижимости'
            else return 'квартиры в новостройке'
        }
    },
    methods: {
        calcfirstPayment ($event) {
            // const value = $event.target.value
            // console.log(value)
            // this.firstPayment = value
            // this.firstPaymentProcent = (parseFloat(value) / parseFloat(this.priceOfBuild)) * 100
            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name, data, module })
        },
        calcfirstPaymentProcent ($event) {
            const data = $event.target.value

            this.firstPaymentProcent = value
            this.firstPayment = (parseFloat(this.priceOfBuild) / 100) * parseFloat(value)

            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name, data, module })
        },
        calcpriceOfBuild ($event) {
            // const value = $event.target.value

            // this.firstPaymentProcent = (parseFloat(this.firstPayment) / parseFloat(value)) * 100
            // this.firstPayment = (parseFloat(value) / 100) * parseFloat(this.firstPaymentProcent)
            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name, data, module })
        },
        calcsummCredit ($event) {
            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name, data, module })
        }
    },
    validations () {
        return {
            creditPurpose: {
                required
            },
            priceOfBuild: {
                required,
                digits
            },
            firstPayment: {
                required,
                digits,
                notHigher: () => notHigher(this.firstPayment, this.priceOfBuild)
            },
            summCredit: {
                required,
                digits,
                notHigher: () => notHigher(this.firstPayment, this.priceOfBuild)
            },
            firstPaymentProcent: {
                required,
                procent
            }
        }
    },
    mounted () {
        animate(this)
    }
}
</script>

<style>

</style>
