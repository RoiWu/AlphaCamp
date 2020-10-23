function randomChar(num = 1) {
  const char = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789"
  let   code = ""
  for (let step = 0; step < num; step++) {
    code += char[Math.floor(Math.random()*char.length)]
  }
  return code
}

function checkrepeat(code, array) {
  for (let tmp of array) {
    if (tmp===code) return true
  }
  return false
}

const createcode = function createcode(array, num=5) {
  let code = randomChar(num)
  while (checkrepeat(code, array)) {
    code = randomChar(num)
  }
  return code
}

module.exports = createcode