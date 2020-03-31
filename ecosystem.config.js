module.exports = {
  apps: [{
    name: 'gopher-wood',
    script: 'node __sapper__/build',
    exec_mode: 'cluster',
    instances: 1,
    watch: true,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }]
}
