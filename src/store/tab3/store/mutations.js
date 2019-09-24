export default {
  deletePerson (state, data) {
    state.countPersons.splice(state.countPersons.indexOf(data), 1)
  },
  addPerson (state) {
    state.countCreatedPersons++
    state.countPersons.push(state.countCreatedPersons)
    let prevInfo = JSON.parse(localStorage.anketa)
    if (prevInfo.tab3 === undefined) {
      prevInfo.tab3 = {}
    }
    prevInfo.tab3.countPersons = state.countPersons
    localStorage.anketa = JSON.stringify(prevInfo)
  }
}
