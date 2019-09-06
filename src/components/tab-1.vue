<template>
  <div class="tab">
        <div class="input-wrapper">
            <label>
                <div class="input-label">Имя</div>
                <input type="text" class="input-text" name="name" v-model="name" @change="setInput($event)">
            </label>
            <div class="error" v-if="!$v.name.required">Поле обязательно для заполнения</div>

        </div>
        <pre>{{ $v.name }}</pre>
        <div class="input-wrapper">
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" v-model="lastName" @change="setInput($event)">
                <div class="error" v-if="!$v.lastName.required">Поле обязательно для заполнения</div>
            </label>
        </div>
        <transition-group name='slide-down'>
            <div class="input-wrapper" v-if="this.$store.state.tab1.hasSecondName" :key="hasSecondName">
                <label>
                    <div class="input-label">Отчество</div>
                    <input type="text" class="input-text" name="secondName" v-model="secondName" @change="setInput($event)">
                    <div class="error" v-if="!$v.secondName.required">Поле обязательно для заполнения</div>
                </label>
            </div>
        </transition-group>
        <label class="checkbox-label" :class="{ active: !hasSecondName }">
            <input type="checkbox" name="hasSecondName" v-model="hasSecondName" @change="setHasSecondName($event)">
            Нет отчества
        </label>
        <div class="input-wrapper">
            <label>
                <div class="input-label">Дата рождения</div>
                <input type="text" class="input-text" name="birthday" v-model="birthday" @change="setInput($event)">
                <div class="error" v-if="!$v.birthday.required">Поле обязательно для заполнения</div>
            </label>
        </div>
        <div class="tab-bottom">
            <div class="button" @click="checkTab">Вперед</div>
        </div>
        <div class="bottom">
            {{ hasSecondName }}
        </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { alpha, digits } from '../validations/validations'

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
    if (this.hasSecondName) {
      return {
        name: {
          required,
          alpha
        },
        lastName: {
          required
        },
        secondName: {
          required
        },
        birthday: {
          required,
          digits
        }
      }
    } else {
      return {
        name: {
          required
        },
        lastName: {
          required
        },
        birthday: {
          required
        }
      }
    }
  },
  methods: {
    setInput (event) {
      let name = event.target.getAttribute('name')
      this[name] = event.target.value
      this.$v[name].$touch()
      if (this.$v[name].$invalid) return false
      this.globalCommitData(event)
    },
    setHasSecondName (event) {
      this.hasSecondName = event.target.checked
      this.globalCommitDataCheckbox(event)
    },
    checkTab () {
      this.$v.$touch()
      if (this.$v.$invalid) return false
      this.$router.push('second')
    }
  }
}
</script>
