<template>
  <div class="tab">
    <div class="tab-head" animated>
      <h2>Личные данные Заёмщика / Созаемщика</h2>
      <div class="tab-row">
        <div class="button_person" id-soz="main" @click="switchPersonTab ($event)">Заёмщик</div>
        <div class="button_person" v-for="i in $store.state.tab3.countPersons" :key="i" :id-soz="`${i}`" @click="switchPersonTab ($event)">
          <span>Созаёмщик</span>
          <div class="cross" @click="deletePerson($event)"></div>
        </div>
        <div class="button_add" @click="addSoz()">Добавить созаёмщика</div>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <transition-group name="slide" mode="out-in">
          <third-soz 
            v-for="i in $store.state.tab3.countPersons"
            v-show="chosenPerson === `${i}`"
            :key="i"
            :id="i"
          ></third-soz>
          <div class="content"
            v-show="chosenPerson === 'main'"
            :key="'main'"
          >
            <input-custom
              v-model="testInput"
            />
            
          </div>
        </transition-group>
      </keep-alive>
      <div>{{ chosenPerson }}</div>
    </div>
    <div class="tab-bottom" animated>
      <div class="button" @click="checkTab($event)" previous to="/second">Назад</div>
      <div class="button" @click="checkTab($event)" to="fourth">Вперед</div>
    </div>
  </div>
</template>

<script>
import thirdSoz from '../components/tab3soz'
import inputCustom from '../components/elements/_input'

export default {
  data () {
    return {
      chosenPerson: '',
      testInput: ''
    }
  },
  components: {
    thirdSoz,
    inputCustom
  },
  methods: {
    addSoz () {
      if (this.$store.state.tab3.countPersons.length === 3) return false
      this.$store.commit('addPerson')
    },
    deletePerson (e) {
      e.stopPropagation()
      let id = e.target.closest('[id-soz]').getAttribute('id-soz')
      this.chosenPerson = 'main'
      this.$store.commit('deletePerson', parseInt(id))
    },
    switchPersonTab (e) {
      const id = e.target.closest('.button_person').getAttribute('id-soz')
      this.chosenPerson = id
    }
  }
}
</script>

<style>

</style>
