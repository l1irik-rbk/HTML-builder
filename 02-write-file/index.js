const fs =  require('fs')
const path = require('path')
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({ input, output })
const newPath = path.join(__dirname, 'text.txt')
const newFail = fs.createWriteStream(newPath)

console.log('Здравствуйте!\nПожалуйста, введите ваш текст!')

rl.on('line', (input) => {
  if (input === 'exit') {
    process.exit()
  } else {
    newFail.write(`${input}\n`)
  }
})

process.on('exit', () => console.log('Досвидания!'))
