export default {
  changeState (state, { name, data }) {
    state[name] = data
    let prevInfo = JSON.parse(localStorage.anketa)
    prevInfo[name] = data
    localStorage.anketa = JSON.stringify(prevInfo)
  }
}
