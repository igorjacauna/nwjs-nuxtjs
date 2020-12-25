const { loadNuxt, build } = require('nuxt')
const { spawn } = require('child_process')
const npmWhich = require('npm-which')(__dirname)
const runPath = npmWhich.sync('run')

const app = require('express')()
const isDev = process.env.NODE_ENV === 'development'
const port = process.env.PORT || 3000

let nwProcess = null

function createNwProcess () {
    nwProcess = spawn(runPath, ['.'])
  
    nwProcess.stdout.on('data', (data) => {
      const msg = data.toString('utf8')
      console.log(msg)
    })
  
    nwProcess.stderr.on('data', (data) => {
      const msg = data.toString('utf8')
      console.error(msg)
    })
  
    nwProcess.on('close', () => {
      process.exit()
    })
  }

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt.js
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()
createNwProcess()