export default {
  getInfoFromLocal (context) {
    const prevInfo = JSON.parse(localStorage.getItem('anketa'))
    for (let name in prevInfo) {
      if (name === undefined) return false
      let data = prevInfo[name]
      context.commit('changeState', { name, data })
    }
  }
}
