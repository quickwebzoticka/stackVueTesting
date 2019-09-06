<template>
   <div class="tab">
        <div class="input-wrapper">
            <label>
                <div class="input-label">Имя</div>
                <input type="text" class="input-text">
            </label>
        </div>
        <div class="tab-bottom">
            <router-link class="button" :to="{ name: 'first' }">Назад</router-link>
            <router-link class="button" :to="{ name: 'third' }">Вперед</router-link>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
