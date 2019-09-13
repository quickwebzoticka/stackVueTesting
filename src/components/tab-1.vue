<template>
  <div class="tab">
        <div class="input-wrapper" :class="{ error: $v.name.$error }" animated>
            <label>
                <div class="input-label">Имя</div>
                <input type="text" class="input-text" name="name" v-model="name" @change="setInput($event, 'value', 'tab1')">
            </label>
            <div class="error" v-if="!$v.name.required && $v.name.$dirty">Поле обязательно для заполнения</div>
            <div class="error" v-if="!$v.name.alpha && $v.name.$dirty">Может содержать только русские символы</div>
        </div>
        <div class="input-wrapper" :class="{ error: $v.lastName.$error }"  animated>
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" v-model="lastName" @change="setInput($event, 'value', 'tab1')">
                <div class="error" v-if="!$v.lastName.required && $v.lastName.$dirty">Поле обязательно для заполнения</div>
                <div class="error" v-if="!$v.lastName.alpha && $v.lastName.$dirty">Может содержать только русские символы</div>
                
            </label>            
        </div>
        <transition-group name='slide-down'>
            <div class="input-wrapper" v-if="this.$store.state.tab1.hasSecondName" :key="hasSecondName" :class="{ error: $v.secondName.$error }"  animated>
                <label>
                    <div class="input-label">Отчество</div>
                    <input type="text" class="input-text" name="secondName" v-model="secondName" @change="setInput($event, 'value', 'tab1')">
                    <div class="error" v-if="!$v.secondName.required && $v.secondName.$dirty">Поле обязательно для заполнения</div>
                    <div class="error" v-if="!$v.secondName.alpha && $v.secondName.$dirty">Может содержать только русские символы</div>
                </label>
            </div>
        </transition-group>
        <label class="checkbox-label" :class="{ active: !$store.state.tab1.hasSecondName }"  animated>
            <input type="checkbox" name="hasSecondName" v-model="hasSecondName" @change="setInput($event, 'checked', 'tab1')">
            Нет отчества
        </label>
        <div class="input-wrapper" :class="{ error: $v.birthday.$error }"  animated>
            <label>
                <div class="input-label">Дата рождения</div>
                <input type="text" class="input-text" name="birthday" v-model="birthday" @change="setInput($event, 'value', 'tab1')">
                <div class="error" v-if="!$v.birthday.required && $v.birthday.$dirty">Поле обязательно для заполнения</div>
                <div class="error" v-if="!$v.birthday.date && $v.birthday.$dirty">Должно быть в формате ДД.ММ.ГГГГ</div>
            </label>
        </div>
        <div class="tab-bottom"  animated>
            <div class="button" @click="checkTab($event)" to="second">Вперед</div>
        </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { alpha, digits, date } from '../validations/validations'

import { animate } from '../mixins/animate'

export default {
  data () {
    return {
      hasSecondName: this.$store.state.tab1.hasSecondName,
      name: this.$store.state.tab1.name,
      lastName: this.$store.state.tab1.lastName,
      secondName: this.$store.state.tab1.secondName,
      birthday: this.$store.state.tab1.birthday
    }
  },
  validations () {
    if (this.$store.state.tab1.hasSecondName) {
      return {
        name: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        secondName: {
          required,
          alpha
        },
        birthday: {
          required,
          date
        }
      }
    } else {
      return {
        name: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        birthday: {
          required,
          date
        }
      }
    }
  },
  mounted() {
    const context = this
    animate(context);
  }
}
</script>
