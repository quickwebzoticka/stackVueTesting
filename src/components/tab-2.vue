<template>
   <div class="tab">
       <div class="tab-head">
           <h2>Информация о запрашиваем кредите</h2>
       </div>
        <label class="input-radio" :class="{ active: this.$store.state.creditPurpose === 'Новостройка' }">
            <input type="radio" name="creditPurpose" value="Новостройка" @change="setInput($event, 'value')">
            <span>Покупка квартиры в новостройке</span>
        </label>
        <label class="input-radio" :class="{ active: this.$store.state.creditPurpose === 'Готовая недвижимость' }">
            <input type="radio" name="creditPurpose" value="Готовая недвижимость" @change="setInput($event, 'value')">
            <span>Покупка квартиры в готовой недвижимости</span>
        </label>
        <label class="input-radio" :class="{ active: this.$store.state.creditPurpose === 'Коммерческая недвижимость' }">
            <input type="radio" name="creditPurpose" value="Коммерческая недвижимость" @change="setInput($event, 'value')">
            <span>Покупка коммерческой недвижимости</span>
        </label>
        <div class="input-wrapper" :class="{ error: $v.priceOfBuild.$error }">
            <label>
                <div class="input-label">Стоимость {{ creditPurposeText }}</div>
                <input type="text" class="input-text" name="priceOfBuild" :value="priceOfBuild | money" @change="calcpriceOfBuild($event)">
                <div class="error" v-if="!$v.priceOfBuild.digits && $v.priceOfBuild.$dirty">Может содержать только число</div>
                <div class="error" v-if="!$v.priceOfBuild.required && $v.priceOfBuild.$dirty">Обязательное поле</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPayment.$error }">
            <label>
                <div class="input-label">Первоначальный взнос</div>
                <input type="text" class="input-text" name="firstPayment" :value="firstPayment | money" @change="calcfirstPayment($event)">
                <div class="error" v-if="!$v.firstPayment.required && $v.firstPayment.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPayment.notHigher && $v.firstPayment.$dirty">Не должно быть выше стоимости недвижимости</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPaymentProcent.$error }">
            <label>
                <div class="input-label">Первоначальный взнос в процентах</div>
                <input type="text" class="input-text" name="firstPaymentProcent" :value="firstPaymentProcent | procent" @change="calcfirstPaymentProcent($event)">
                <div class="error" v-if="!$v.firstPaymentProcent.required && $v.firstPaymentProcent.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPaymentProcent.procent && $v.firstPaymentProcent.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.summCredit.$error }">
            <label>
                <div class="input-label">Сумма кредита</div>
                <input type="text" class="input-text" name="summCredit" :value="summCredit | money" @change="calcsummCredit($event)">
                <div class="error" v-if="!$v.summCredit.required && $v.summCredit.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.summCredit.notHigher && $v.summCredit.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <div class="tab-bottom">
            <div class="button" @click="checkTab($event)" previous to="/">Назад</div>
            <div class="button" @click="checkTab($event)" to="third">Вперед</div>
        </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { digits, procent, notHigher } from '../validations/validations'

export default {
    data () {
        return {
            creditPurpose: this.$store.state.creditPurpose,
            priceOfBuild: this.$store.state.priceOfBuild,
            firstPayment: this.$store.state.firstPayment,
            firstPaymentProcent: this.$store.state.firstPaymentProcent,
            summCredit: this.$store.state.summCredit
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
            const value = $event.target.value
            console.log(value)
            this.firstPayment = value
            this.firstPaymentProcent = (parseFloat(value) / parseFloat(this.priceOfBuild)) * 100
            this.setInput($event, 'value')
        },
        calcfirstPaymentProcent ($event) {
            const value = $event.target.value

            this.firstPaymentProcent = value
            this.firstPayment = (parseFloat(this.priceOfBuild) / 100) * parseFloat(value)
            this.setInput($event, 'value')
        },
        calcpriceOfBuild ($event) {
            const value = $event.target.value

            this.firstPaymentProcent = (parseFloat(this.firstPayment) / parseFloat(value)) * 100
            this.firstPayment = (parseFloat(value) / 100) * parseFloat(this.firstPaymentProcent)
            this.setInput($event, 'value')
        },
        calcsummCredit ($event) {
            this.setInput($event, 'value')
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
    }
}
</script>

<style>

</style>
