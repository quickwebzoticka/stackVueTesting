const alpha = val => /^[а-яё]*$/i.test(val)
const digits = val => /^[0-9]*$/i.test(val)
const date = val => /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(val)
const procent = val => parseInt(val) >= 0 && parseInt(val) <= 100
const notHigher = (val, price) => parseFloat(val) <= parseFloat(price)
const notHigherYears = (val, maxYear) => parseFloat(val) <= parseFloat(maxYear)

export { alpha, digits, date, procent, notHigher, notHigherYears }
