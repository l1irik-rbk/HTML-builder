const fs =  require('fs')
const path = require('path')

const newPath = path.join(__dirname, 'text.txt')
const redableStream = fs.createReadStream(newPath, 'utf-8')
redableStream.on('data', chunk => console.log(chunk))