<template>
  <div>
      <input type="text" :value="testInput" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
    props: ['testInput']
}
</script>