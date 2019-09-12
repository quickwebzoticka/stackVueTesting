export default {
  changeState (state, { name, data, module }) {
    state[module][name] = data
    let prevInfo = JSON.parse(localStorage.anketa)
    if (prevInfo[module] === undefined) {
      prevInfo[module] = {}
    }
    prevInfo[module][name] = data
    localStorage.anketa = JSON.stringify(prevInfo)
  }
}
