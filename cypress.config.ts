import { defineConfig } from 'cypress'
import * as fs from 'fs'

export default defineConfig({
  e2e: {
    baseUrl: 'https://bbc.co.uk/',
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on) {
      on('task', {
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8')
          }

          return null
        },
      })
    },
  },
})


