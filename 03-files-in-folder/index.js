const path = require('path')
const { readdir, stat } = require('fs/promises')

async function geasaf() {
  try {
    const newPath = path.join(__dirname, 'secret-folder')
    const files = await readdir(newPath, { withFileTypes: true })

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(newPath, file.name)
        const fileExtension = path.extname(filePath).slice(1)
        const fileParse = path.parse(filePath)
        const fileParseName = fileParse.name
        const stats = await stat(filePath)
        const statsSize = stats.size

        console.log(`${fileParseName} - ${fileExtension} - ${statsSize} байт`)
      }
    }
  } catch (err) {
    console.error(err)
  }
}
geasaf()