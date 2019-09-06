const alpha = val => /^[а-яё]*$/i.test(val)
const digits = val => /^[0-9]*$/i.test(val)

export { alpha, digits }
