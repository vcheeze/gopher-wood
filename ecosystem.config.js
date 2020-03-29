module.exports = {
  apps: [{
    name: 'gopher-wood',
    script: 'node __sapper__/build',
    env: {
      PORT: 3000,
      NODE_ENV: 'development',
    },
    env_production: {
      PORT: 80,
      NODE_ENV: 'production',
    },
  }]
}