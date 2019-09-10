export default {
  methods: {
    globalCommitData ($event, attr, fixed) {
      let name = $event.target.getAttribute('name')
      let data = fixed === undefined ? fixed : $event.target[attr]

      this.$store.commit('changeState', { name, data })
    },
    setInput (event, attr, fixed) {
      let name = event.target.getAttribute('name')
      this[name] = event.target.value

      if (this.$v[name] !== undefined) {
        this.$v[name].$touch()
        if (this.$v[name].$invalid) return false
      }
      this.globalCommitData(event, attr, fixed)
    },
    checkTab (e) {
      const tab = e.target.getAttribute('to')

      this.$v.$touch()
      if (this.$v.$invalid && !e.target.hasAttribute('previous')) return false
      this.$router.push(tab)
    }
  }
}
