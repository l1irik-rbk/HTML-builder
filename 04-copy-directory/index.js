const path = require('path')
const { copyFile, mkdir, readdir } = require('fs/promises')

async function copyDir() {
  try {
    const pathFiles = path.join(__dirname, 'files')
    const pathFilesCopy = path.join(__dirname, 'files-copy')
    const files = await readdir(pathFiles, { withFileTypes: true })

    mkdir(pathFilesCopy, { recursive: true }, () => {
      console.log('Done!')
    })

    for (const file of files) {
      if (file.isFile()) {
        const oldFilePath = path.join(pathFiles, file.name)
        const newFilePath = path.join(pathFilesCopy, file.name)
        await copyFile(oldFilePath, newFilePath)
      }
    }

  } catch (err) {
    console.log(err)
  }
}
copyDir()