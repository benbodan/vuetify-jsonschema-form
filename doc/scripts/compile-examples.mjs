import path from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs'
import ejs from 'ejs'
import compile from '@koumoul/vjsf-compiler'
import examples from '../examples/index.js'
import slotCodes from '../examples/slot-codes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compBaseDir = path.join(__dirname, '../components/compiled')
rmSync(compBaseDir, { recursive: true, force: true })
mkdirSync(compBaseDir)

const pageBaseDir = path.join(__dirname, '../pages/compiled')
rmSync(pageBaseDir, { recursive: true, force: true })
mkdirSync(pageBaseDir)
const pageTemplate = readFileSync(path.join(__dirname, 'compiled-example-page.vue.ejs'), 'utf8')

for (const exampleSuite of examples) {
  mkdirSync(path.join(compBaseDir, exampleSuite.id))
  mkdirSync(path.join(pageBaseDir, exampleSuite.id))
  for (const example of exampleSuite.examples) {
    const compCode = await compile(example.schema)
    writeFileSync(path.join(compBaseDir, exampleSuite.id, example.id + '.vue'), compCode)

    let slotsCode = ''
    for (const key of example.codeSlots || []) {
      slotsCode += slotCodes[key] + '\n'
    }
    const pageCode = ejs.render(pageTemplate, { exampleSuite, example, slotsCode })
    writeFileSync(path.join(pageBaseDir, exampleSuite.id, example.id + '.vue'), pageCode)
  }
}
