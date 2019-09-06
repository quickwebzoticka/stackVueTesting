export default {
  methods: {
    globalCommitData ($event) {
      let name = $event.target.getAttribute('name')
      let data = $event.target.value

      this.$store.commit('changeState', { name, data })
    },
    globalCommitDataCheckbox ($event) {
      let name = $event.target.getAttribute('name')
      let data = $event.target.checked

      this.$store.commit('changeState', { name, data })
    }
  }
}
