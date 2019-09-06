<template>
  <div class="tab">
      <div class="input-wrapper">
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" @change="globalCommitData($event)">
            </label>
        </div>
        <div class="input-wrapper">
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" @change="globalCommitData($event)">
            </label>
        </div>
        <div class="input-wrapper">
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" @change="globalCommitData($event)">
            </label>
        </div>
        <div class="input-wrapper">
            <label>
                <div class="input-label">Фамилия</div>
                <input type="text" class="input-text" name="lastName" @change="globalCommitData($event)">
            </label>
        </div>
        <div class="tab-bottom">
            <router-link class="button" :to="{ name: 'second' }">Назад</router-link>
            <router-link class="button" :to="{ name: 'fourth' }">Вперед</router-link>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
