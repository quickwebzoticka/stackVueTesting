<template>
   <div class="tab">
       <div class="tab-head" animated>
           <h2>Информация о запрашиваем кредите</h2>
       </div>
        <label class="input-radio" :class="{ active: $store.state.tab2.creditPurpose === 'Новостройка' }" animated>
            <input type="radio" name="creditPurpose" value="Новостройка" v-model="creditPurpose" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка квартиры в новостройке</span>
        </label>
        <label class="input-radio" :class="{ active: $store.state.tab2.creditPurpose === 'Готовая недвижимость' }" animated>
            <input type="radio" name="creditPurpose" value="Готовая недвижимость" v-model="creditPurpose" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка квартиры в готовой недвижимости</span>
        </label>
        <label class="input-radio" :class="{ active: $store.state.tab2.creditPurpose === 'Коммерческая недвижимость' }" animated>
            <input type="radio" name="creditPurpose" value="Коммерческая недвижимость" v-model="creditPurpose" @change="setInput($event, 'value', 'tab2')">
            <span>Покупка коммерческой недвижимости</span>
        </label>
        <div class="input-wrapper" :class="{ error: $v.priceOfBuild.$error }" animated>
            <label>
                <div class="input-label">Стоимость {{ creditPurposeText }}</div>
                <input type="text" class="input-text" name="priceOfBuild" :value="$store.state.tab2.priceOfBuild | money" @change="calcpriceOfBuild($event)">
                <div class="error" v-if="!$v.priceOfBuild.digits && $v.priceOfBuild.$dirty">Может содержать только число</div>
                <div class="error" v-if="!$v.priceOfBuild.required && $v.priceOfBuild.$dirty">Обязательное поле</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPayment.$error }" animated>
            <label>
                <div class="input-label">Первоначальный взнос</div>
                <input type="text" class="input-text" name="firstPayment" :value="$store.state.tab2.firstPayment | money" @change="calcfirstPayment($event)">
                <div class="error" v-if="!$v.firstPayment.required && $v.firstPayment.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPayment.notHigher && $v.firstPayment.$dirty">Не должно быть выше стоимости недвижимости</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.firstPaymentProcent.$error }" animated>
            <label>
                <div class="input-label">Первоначальный взнос в процентах</div>
                <input type="text" class="input-text" name="firstPaymentProcent" :value="$store.state.tab2.firstPaymentProcent | procent" @change="calcfirstPaymentProcent($event)">
                <div class="error" v-if="!$v.firstPaymentProcent.required && $v.firstPaymentProcent.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.firstPaymentProcent.procent && $v.firstPaymentProcent.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.summCredit.$error }" animated>
            <label>
                <div class="input-label">Сумма кредита</div>
                <input type="text" class="input-text" name="summCredit" :value="$store.state.tab2.summCredit | money" @change="calcsummCredit($event)">
                <div class="error" v-if="!$v.summCredit.required && $v.summCredit.$dirty">Обязательное поле</div>
                <div class="error" v-if="!$v.summCredit.notHigher && $v.summCredit.$dirty">Должно быть до 100 %</div>
            </label>
        </div>
        <label class="checkbox-label" :class="{ active: $store.state.tab2.hasAdditionalPV === 'matCap' }"  animated>
            <input type="radio" name="hasAdditionalPV" value="matCap" @click="forRadioOne($event)">
            Материнский капитал
        </label>
        <transition-group name='slide-down'>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'matCap'" :key="'hasMatCap'" :class="{ error: $v.matCapSumm.$error }"  animated>
                <label>
                    <div class="input-label">Размер материнского капитала</div>
                    <input type="text" class="input-text" name="matCapSumm" :value="$store.state.tab2.matCapSumm | money" @change="setInput($event, 'value', 'tab1')">
                    <div class="error" v-if="!$v.matCapSumm.digits && $v.matCapSumm.$dirty">Может содержать только цифры</div>
                </label>
            </div>
        </transition-group>        
        <label class="checkbox-label" :class="{ active: $store.state.tab2.hasAdditionalPV === 'militaryCap'}"  animated>
            <input type="radio" name="hasAdditionalPV" value="militaryCap" @click="forRadioOne($event)">
            Военная ипотека
        </label>
        <transition-group name='slide-down'>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'militaryCap'" :key="'hasMilitaryCap1'" :class="{ error: $v.militaryCapSumm.$error }"  animated>
                <label>
                    <div class="input-label">Размер Накопительной Ипотечной Системы</div>
                    <input type="text" class="input-text" name="militaryCapSumm" :value="$store.state.tab2.militaryCapSumm | money" @change="setInput($event, 'value', 'tab1')">
                    <div class="error" v-if="!$v.militaryCapSumm.digits && $v.militaryCapSumm.$dirty">Может содержать только цифры</div>
                </label>
            </div>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'militaryCap'" :key="'hasMilitaryCap2'" :class="{ error: $v.militaryCapSummPercentage.$error }"  animated>
                <label>
                    <div class="input-label">В процентах</div>
                    <input type="text" class="input-text" name="militaryCapSummPercentage" :value="$store.state.tab2.militaryCapSummPercentage | procent" @change="setInput($event, 'value', 'tab2')">
                    <div class="error" v-if="!$v.militaryCapSummPercentage.procent && $v.militaryCapSummPercentage.$dirty">Может содержать только цифры</div>
                </label>
            </div>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'militaryCap'" :key="'hasMilitaryCap3'" :class="{ error: $v.militaryCapDate.$error }"  animated>
                <label>
                    <div class="input-label">Дата выдачи НИС</div>
                    <input type="text" class="input-text" name="militaryCapDate" :value="$store.state.tab2.militaryCapDate" @change="setInput($event, 'value', 'tab2')">
                    <div class="error" v-if="!$v.militaryCapDate.date && $v.militaryCapDate.$dirty">Должно быть в формате ДД.ММ.ГГГГ</div>
                </label>
            </div>
        </transition-group>
        <label class="checkbox-label" :class="{ active: $store.state.tab2.hasAdditionalPV === 'subsidy' }"  animated>
            <input type="radio" name="hasAdditionalPV" value="subsidy" @click="forRadioOne($event)">
            Субсидия
        </label>
        <transition-group name='slide-down'>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'subsidy'" :key="'subsidy1'" :class="{ error: $v.subsidySumm.$error }"  animated>
                <label>
                    <div class="input-label">Размер субсидии</div>
                    <input type="text" class="input-text" name="subsidySumm" :value="$store.state.tab2.subsidySumm | money" @change="setInput($event, 'value', 'tab2')">
                    <div class="error" v-if="!$v.subsidySumm.digits && $v.subsidySumm.$dirty">Может содержать только цифры</div>
                </label>
            </div>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'subsidy'" :key="'subsidy2'" :class="{ error: $v.subsidyProcent.$error }"  animated>
                <label>
                    <div class="input-label">В процентах</div>
                    <input type="text" class="input-text" name="subsidyProcent" :value="$store.state.tab2.subsidyProcent | procent" @change="setInput($event, 'value', 'tab2')">
                    <div class="error" v-if="!$v.subsidyProcent.procent && $v.subsidyProcent.$dirty">Может содержать только цифры</div>
                </label>
            </div>
            <label v-if="$store.state.tab2.hasAdditionalPV === 'subsidy'" :key="'subsidy3'"  animated class="mb-20">
                <select name="subsidyPurpose" v-model="subsidyPurpose" @change="setInput($event, 'value', 'tab2')">
                    <option value="Молодёжи - доступное жилье">Молодёжи - доступное жилье</option>
                    <option value="Соц. выплата «Развитие долгосрочного жилищного кредитования в СПБ»">Соц. выплата «Развитие долгосрочного жилищного кредитования в СПБ»</option>
                    <option value="Соц. выплата «Расселение коммунальных квартир»">Соц. выплата «Расселение коммунальных квартир»</option>
                    <option value="Соц. выплата «Обеспечение жильём молодых семей»">Соц. выплата «Обеспечение жильём молодых семей»</option>
                    <option value="Субсидия на приобретение строительства (312)">Субсидия на приобретение строительства (312)</option>
                    <option value="Другое">Другое</option>
                </select>
            </label>
            <div class="input-wrapper" v-if="$store.state.tab2.hasAdditionalPV === 'subsidy' && $store.state.tab2.subsidyPurpose === 'Другое'" :key="'subsidy4'"  animated>
                <label>
                    <div class="input-label">Другое</div>
                    <input type="text" class="input-text" name="subsidyPurposeAnother" :value="$store.state.tab2.subsidyPurposeAnother" @change="setInput($event, 'value', 'tab2')">
                </label>
            </div>
        </transition-group>
        <div class="input-row mb-20">
            <div class="input-header mb-20" animated>Страхование жизни и здоровья</div>
            <label class="input-radio mb-20" :class="{ active: $store.state.tab2.insurance === 'Да' }" animated>
                <input type="radio" name="insurance" value="Да" v-model="insurance" @change="setInput($event, 'value', 'tab2')">
                <span>Да</span>
            </label>
            <label class="input-radio" :class="{ active: $store.state.tab2.insurance === 'Нет' }" animated>
                <input type="radio" name="insurance" value="Нет" v-model="insurance" @change="setInput($event, 'value', 'tab2')">
                <span>Нет</span>
            </label>
        </div>
        <div class="input-wrapper" :class="{ error: $v.creditTerm.$error }" animated>
            <label>
                <div class="input-label">Срок кредита, количество лет</div>
                <input type="text" class="input-text" name="creditTerm" :value="$store.state.tab2.creditTerm | years" @change="setInput($event, 'value', 'tab2')">
                <div class="error" v-if="!$v.creditTerm.digits && $v.creditTerm.$dirty">Может содержать только цифры</div>                
                <div class="error" v-if="!$v.creditTerm.notHigherYears && $v.creditTerm.$dirty">Не может быть больше 100 лет</div>
            </label>
        </div>
        <div class="tab-bottom" animated>
            <div class="button" @click="checkTab($event)" previous to="/">Назад</div>
            <div class="button" @click="checkTab($event)" to="third">Вперед</div>
        </div>
        <div @click="test()">test</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { digits, procent, notHigher, date, notHigherYears } from '../validations/validations'
import testValidations from '../validations/testValidations'

import { animate } from '../mixins/animate'

export default {
    data () {
        return {
            creditPurpose: this.$store.state.tab2.creditPurpose,
            priceOfBuild: this.$store.state.tab2.priceOfBuild,
            firstPayment: this.$store.state.tab2.firstPayment,
            firstPaymentProcent: this.$store.state.tab2.firstPaymentProcent,
            summCredit: this.$store.state.tab2.summCredit,
            hasAdditionalPV: this.$store.state.tab2.hasAdditionalPV,
            matCapSumm: this.$store.state.tab2.matCapSumm,
            militaryCapSumm: this.$store.state.tab2.militaryCapSumm,
            militaryCapSummPercentage: this.$store.state.tab2.militaryCapSummPercentage,
            militaryCapDate: this.$store.state.tab2.militaryCapDate,
            subsidySumm: this.$store.state.tab2.subsidySumm,
            subsidyProcent: this.$store.state.tab2.subsidyProcent,
            subsidyPurpose: this.$store.state.tab2.subsidyPurpose,
            creditTerm: this.$store.state.tab2.creditTerm,
            insurance: this.$store.state.tab2.insurance
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
        forRadioOne (e) {
            if (e.target.value === this.$store.state.tab2.hasAdditionalPV && e.target.closest('.checkbox-label').classList.value.indexOf('active') > -1) {
                e.target.checked = false;
                this.$store.commit('changeState', { name: 'hasAdditionalPV', data: '', module: 'tab2' })
            } else {
                this.$store.commit('changeState', { name: 'hasAdditionalPV', data: e.target.value, module: 'tab2' })
            }
        },
        calcfirstPayment ($event) {
            const value = $event.target.value
            const procent = (parseFloat(value) / parseFloat(this.priceOfBuild)) * 100
            const summ = parseFloat(this.priceOfBuild) - parseFloat(value)

            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name: 'firstPaymentProcent', data: procent, module: 'tab2' })
            this.$store.commit('changeState', { name: 'summCredit', data: summ, module: 'tab2' })
        },
        calcfirstPaymentProcent ($event) {
            const data = $event.target.value
            const pv = (parseFloat(this.priceOfBuild) / 100) * parseFloat(data)
            const summ = parseFloat(this.priceOfBuild) - pv

            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name: 'firstPayment', data: pv, module: 'tab2' })
            this.$store.commit('changeState', { name: 'summCredit', data: summ, module: 'tab2' })
        },
        calcpriceOfBuild ($event) {
            const value = $event.target.value
            const pv = (parseFloat(value) / 100) * parseFloat(this.firstPaymentProcent)
            const summ = parseFloat(value) - pv

            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name: 'firstPayment', data: pv, module: 'tab2' })
            this.$store.commit('changeState', { name: 'summCredit', data: summ, module: 'tab2' })
        },
        calcsummCredit ($event) {
            const data = $event.target.value
            const pv = parseFloat(this.priceOfBuild) - parseFloat(data)
            const procent = (parseFloat(pv) / parseFloat(this.priceOfBuild)) * 100

            this.setInput($event, 'value', 'tab2')
            this.$store.commit('changeState', { name: 'firstPayment', data: pv, module: 'tab2' })
            this.$store.commit('changeState', { name: 'firstPaymentProcent', data: procent, module: 'tab2' })
        }
    },
    validations () {
        const set = {
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
                notHigher: () => notHigher(this.summCredit, this.priceOfBuild)
            },
            firstPaymentProcent: {
                required,
                procent
            },
            creditTerm : {
                digits,
                notHigherYears: () => notHigherYears(this.creditTerm, 100)
            }
        }

        if (this.$store.state.tab2.hasAdditionalPV === '') {
            return Object.assign({}, set)
        }
        if (this.$store.state.tab2.hasAdditionalPV === 'matCap') {
            return Object.assign({}, set, {
                matCapSumm: {
                    digits,
                    notHigher: () => notHigher(this.matCapSumm, this.priceOfBuild)
                }
            })
        }
        if (this.$store.state.tab2.hasAdditionalPV === 'militaryCap') {
            return Object.assign({}, set, {
                militaryCapSummPercentage: {
                    procent
                },
                militaryCapSumm: {
                    digits,
                    notHigher: () => notHigher(this.militaryCapSumm, this.priceOfBuild)                
                },
                militaryCapDate: {
                    date
                }
            })
        }
        if (this.$store.state.tab2.hasAdditionalPV === 'subsidy') {
            return Object.assign({}, set, {
                subsidySumm: {
                    digits,
                    notHigher: () => notHigher(this.militaryCapSumm, this.priceOfBuild)
                },
                subsidyProcent: {
                    procent
                }
            })
        }
    },
    mounted () {
        animate(this)
    }
}
</script>

<style>

</style>
