const path = require('path')
const fs = require('fs')
const { readdir } = require('fs/promises')

const pathProjectDist = path.join(__dirname, 'project-dist', 'bundle.css')
const newCssFail = fs.createWriteStream(pathProjectDist)

async function newFunc() {
  try {
    const newPath = path.join(__dirname, 'styles')
    const files = await readdir(newPath, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(newPath, file.name)

      if (file.isFile() && path.extname(filePath).slice(1) === 'css') {
        const redableStream = fs.createReadStream(filePath, 'utf-8')
        redableStream.on('data', chunk => newCssFail.write(chunk))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
newFunc()