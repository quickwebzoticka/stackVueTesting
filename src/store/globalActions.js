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
    // const iterate = (prevInfo) => {
    //   Object.keys(prevInfo).forEach(key => {
    //     const data = prevInfo[key]
    //     const name = key

    //     context.commit('changeState', { name, data })
    //     if (typeof prevInfo[key] === 'object') {
    //       iterate(prevInfo[key])
    //     }
    //   })
    // }
  }
}
