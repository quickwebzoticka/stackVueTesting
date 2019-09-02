<template>
  <div class="input-phone">
    <div class="input-wrapper">
      <input type="text" v-model="$v.phone.$model" :class="{ errored : $v.phone.$error }">
      <span v-if="$v.phone.$error" class="error">Неправильный формат телефона</span>
    </div>
    
    <select v-model="phoneType">
      <option value="Mobile" selected>Mobile</option>
      <option value="Home">Home</option>
      <option value="Work">Work</option>
    </select>

    <button @click="sendPhone">Send Phone</button>
    <div class="error-message" v-if="submitStatus === 'ERROR'">Неправильный формат телефона</div>
    <div class="ok-message" v-if="submitStatus === 'OK'">Отправлено</div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

const phone = value => {
  const pattern = new RegExp(/^((\+7|7|8)+([0-9]){10})$/i)
  
  return pattern.test(value.replace(/ /g, '').replace(/-/g, ''))
}

export default {
  data () {
    return {
      phoneType: 'Mobile',
      phone: '',
      submitStatus: ''
    }
  },
  validations: {
    phone: {
      required,
      phone
    }
  },
  methods: {
    sendPhone () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR"
        return false;
      } else {
        this.submitStatus = "OK"
      }
      this.$emit('phoneClicked', { phone: this.phone, phoneType: this.phoneType })
    }
  },
  mounted () {
    console.log('validation active')
  }
}
</script>

<style lang="scss" scoped>
.input-phone {
  padding: 10px 0px;
} 
select {
  width: 200px;
  padding: 10px 20px;
  border: 1px solid #3eaf7c;
  outline: none;
  height: 40px;
}
input {
  outline: none;
}
button {
  background: transparent;
  color: #3eaf7c;
  transition: .3s;
  border: 1px solid #3eaf7c;
  border-left: none;
  cursor: pointer;
  width: 200px;
  height: 40px;
  outline: none;

  &:hover {
      color: #FFFFFF;
      background: #3eaf7c;
  }
}
.error {
  color: red;
  padding: 0 20px;
  display: inline-block;
}
.error-message {
  color: red;
  padding: 10px 0;
}
.ok-message {
  color: #3eaf7c;
  padding: 10px 0px;
}
</style>