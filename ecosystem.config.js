module.exports = {
  apps: [{
    name: 'gopher-wood',
    script: 'node __sapper__/build',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }]
}
