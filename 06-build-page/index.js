const path = require('path')
const { copyFile, mkdir, readdir } = require('fs/promises')
const fs = require('fs')

async function addProjectDist() {
  const pathProjectDist = path.join(__dirname, 'project-dist')
  mkdir(pathProjectDist, { recursive: true }, () => { })
}
addProjectDist()

async function addStyle() {
  try {
    const pathStyle = path.join(__dirname, 'project-dist', 'style.css')
    const createPathStyle = fs.createWriteStream(pathStyle)
    const newPath = path.join(__dirname, 'styles')
    const files = await readdir(newPath, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(newPath, file.name)

      if (file.isFile() && path.extname(filePath).slice(1) === 'css') {
        const redableStream = fs.createReadStream(filePath, 'utf-8')
        redableStream.on('data', chunk => createPathStyle.write(chunk))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
addStyle()

async function addAssets() {
  try {
    const pathAssets = path.join(__dirname, 'assets')
    const pathAssetsCopy = path.join(__dirname, 'project-dist', 'assets')

    const assets = await readdir(pathAssets, { withFileTypes: true })
    mkdir(pathAssetsCopy, { recursive: true }, () => { })
  } catch (err) {
    console.error(err)
  }
}
addAssets()

async function addFolder(folder) {
  try {
    const pathAssets = path.join(__dirname, 'assets', folder)
    const pathAssetsCopy = path.join(__dirname, 'project-dist', 'assets', folder)

    const files = await readdir(pathAssets, { withFileTypes: true })
    mkdir(pathAssetsCopy, { recursive: true }, () => { })

    for (const file of files) {
      if (file.isFile()) {
        const oldFilePath = path.join(pathAssets, file.name)
        const newFilePath = path.join(pathAssetsCopy, file.name)
        await copyFile(oldFilePath, newFilePath)
      }
    }
  } catch (err) {
    console.error(err)
  }
}
addFolder('fonts')
addFolder('img')
addFolder('svg')

function createHTML() {
  const pathIndex = path.join(__dirname, 'project-dist', 'index.html')
  const newIndex = fs.createWriteStream(pathIndex)
}
createHTML()

async function changeHTML() {
  const templatePath = path.join(__dirname, 'template.html')
  const indexPath = path.join(__dirname, 'project-dist', 'index.html')
  const newPath = path.join(__dirname, 'components')
  const components = await readdir(newPath, { withFileTypes: true })
  const redableStream = fs.createReadStream(templatePath, 'utf-8')
  let text = ''

  redableStream.on('data', (chunk) => {
    text = chunk
    for (const component of components) {
      const componentPath = path.join(newPath, component.name)
      const componentParse = path.parse(componentPath)
      const componentParseName = componentParse.name

      fs.readFile(componentPath, 'utf-8', (err, data) => {
        if (err) console.log(err)
        
        if (path.extname(componentPath).slice(1) === 'html') {
          text = text.replace(`{{${componentParseName}}}`, data)
        }

        fs.writeFile(indexPath, text, err => {
          if (err) console.log(err)
        })
      })
    }
  })
}
changeHTML()


