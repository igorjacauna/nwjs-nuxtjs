process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const { spawnSync } = require('child_process')
const npmWhich = require('npm-which')(__dirname)
const webpack = require('webpack')

const webpackServerConfig = require('./webpack.server.config')

const manifest = require('./package')

const buildPath = npmWhich.sync('build')

function cleanBuild() {
  return fs.emptydir(path.resolve(__dirname, './', manifest.build.output))
}

function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err)
      else if (stats.hasErrors()) reject(stats.toString({ chunks: false, colors: true }))
      else resolve()
    })
  })
}

function packServer() {
  return pack(webpackServerConfig)
}

function build() {
  manifest.build.nwPlatforms.forEach((os) => {
    manifest.build.nwArchs.forEach((arch) => {
      const buildProcess = spawnSync(buildPath, ['--tasks', `${os}-${arch}`, `--mirror`, 'https://dl.nwjs.io/', '.'], { stdio: 'inherit' })
      console.log(buildProcess)
    })
  })
}

async function main() {
  await Promise.all([cleanBuild()])
  await Promise.all([packServer()])
  build()
}

main()
