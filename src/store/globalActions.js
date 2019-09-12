export default {
  getInfoFromLocal (context) {
    const prevInfo = JSON.parse(localStorage.getItem('anketa'))
    for (let module in prevInfo) {
      if (module === undefined) return false
      let moduleInn = prevInfo[module]
      for (let name in moduleInn) {
        let data = moduleInn[name]
        context.commit('changeState', { name, data, module })
      }
    }
  }
}
