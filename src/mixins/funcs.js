export default {
  methods: {
    globalCommitData ($event, attr) {
      let name = $event.target.getAttribute('name')
      let data = $event.target[attr]

      this.$store.commit('changeState', { name, data })
    },
    setInput (event, attr) {
      let name = event.target.getAttribute('name')
      this[name] = event.target.value

      if (this.$v[name] !== undefined) {
        this.$v[name].$touch()
        if (this.$v[name].$invalid) return false
      }
      this.globalCommitData(event, attr)
    },
    checkTab (e) {
      const tab = e.target.getAttribute('to')

      this.$v.$touch()
      if (this.$v.$invalid && !e.target.hasAttribute('previous')) return false
      console.log(this.$v)
      this.$router.push(tab)
    }
  }
}
